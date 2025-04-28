import crypto from 'crypto';

const publicKey = 'sandbox_i68185538277';
const privateKey = 'sandbox_hvEpaIAMPu054UekmOEoxXomJq9nMaNLmILYY3HX';

const generateSignature = (data) => {
  return crypto
    .createHash('sha1')
    .update(privateKey + data + privateKey)
    .digest('base64');
};

export const createLiqPayPayment = (tour, user) => {
  const params = {
    public_key: publicKey,
    action: 'pay',
    amount: tour.price,
    currency: 'UAH',
    description: `Оплата туру: ${tour.title}`,
    order_id: `${tour._id}-${Date.now()}`,
    version: '3',
    sandbox: 1,
    server_url: 'http://localhost:3000/checkout/callback',
    result_url: 'http://localhost:3000/success',
  };

  const data = Buffer.from(JSON.stringify(params)).toString('base64');
  const signature = generateSignature(data);

  return { data, signature };
};
