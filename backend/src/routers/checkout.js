import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userAuth } from '../middlewares/userAuth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addOrderController,
  checkoutController,
  liqpayCallbackController,
} from '../controllers/checkout.js';
import { addOrderSchema } from '../validation/orders.js';

const router = Router();

router.post('/', userAuth, ctrlWrapper(checkoutController));
router.post(
  '/add',
  userAuth,
  validateBody(addOrderSchema),
  ctrlWrapper(addOrderController),
);
router.post('/callback', ctrlWrapper(liqpayCallbackController));

export default router;
