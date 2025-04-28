import { Router } from 'express';

import toursRouter from './tours.js';
import authRouter from './auth.js';
import feedbacksRouter from './feedbacks.js';
import profileRouter from './profile.js';
import checkoutRouter from './checkout.js';
import categoriesRouter from './categories.js';
import usersRouter from './users.js';

const router = Router();

router.use('/tours', toursRouter);
router.use('/auth', authRouter);
router.use('/feedbacks', feedbacksRouter);
router.use('/profile', profileRouter);
router.use('/checkout', checkoutRouter);
router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);

export default router;
