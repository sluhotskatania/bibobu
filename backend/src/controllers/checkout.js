import crypto from 'crypto';
import createHttpError from 'http-errors';
import { getTourById } from '../services/tours.js';
import { createLiqPayPayment } from '../services/liqpay.js';
import { addOrder } from '../services/checkout.js';

const privateKey = 'sandbox_hvEpaIAMPu054UekmOEoxXomJq9nMaNLmILYY3HX';

export const addOrderController = async (req, res, next) => {
  const payload = {
    userId: req.body.userId,
    tourId: req.body.tourId,
    description: req.body.description,
    totalPrice: req.body.totalPrice,
    shippingAddress: req.body.shippingAddress,
  };

  const newOrder = await addOrder(payload);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a new order',
    data: newOrder,
  });
};

export const checkoutController = async (req, res, next) => {
  const { tourId } = req.body;
  const user = req.user;

  const tour = await getTourById(tourId);
  if (!tour) {
    return next(createHttpError(404, 'Tour not found'));
  }

  const paymentData = createLiqPayPayment(tour, user);

  res.status(200).send({
    status: 200,
    message: 'Payment data generated successfully',
    data: paymentData,
  });
};

export const liqpayCallbackController = async (req, res, next) => {
  const { data, signature } = req.body;

  const expectedSignature = crypto
    .createHash('sha1')
    .update(privateKey + data + privateKey)
    .digest('base64');

  if (signature !== expectedSignature) {
    return next(createHttpError(400, 'Invalid signature'));
  }

  const paymentData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));

  if (paymentData.status === 'success') {
    const { order_id } = paymentData;
    const [tourId] = order_id.split('-');

    const tour = await getTourById(tourId);
    if (!tour) {
      return next(createHttpError(404, 'Tour not found for order creation'));
    }

    res
      .status(200)
      .send({ status: 200, message: 'Payment successful and order created' });
  } else {
    return next(createHttpError(400, 'Payment failed'));
  }
};
