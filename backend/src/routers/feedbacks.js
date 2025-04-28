import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userAuth } from '../middlewares/userAuth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  addFeedbackController,
  getFeedbacksByTourController,
  getFeedbacksByUserController,
  deleteFeedbackController,
} from '../controllers/feedbacks.js';
import { addFeedbackSchema } from '../validation/feedbacks.js';

const router = Router();

// User
router.post(
  '/',
  userAuth,
  validateBody(addFeedbackSchema),
  ctrlWrapper(addFeedbackController),
);

router.get(
  '/tour/:tourId',
  isValidId,
  ctrlWrapper(getFeedbacksByTourController),
);
router.get(
  '/user/:userId',
  isValidId,
  ctrlWrapper(getFeedbacksByUserController),
);

router.delete(
  '/:feedbackId',
  userAuth,
  isValidId,
  ctrlWrapper(deleteFeedbackController),
);

export default router;
