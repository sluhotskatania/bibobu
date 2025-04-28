import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userAuth } from '../middlewares/userAuth.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

import {
  getAllToursController,
  getTourByIdController,
  addTourController,
  updateTourController,
  deleteTourController,
  likeTourController,
} from '../controllers/tours.js';

import { addTourSchema, updateTourSchema } from '../validation/tours.js';

const router = Router();

// User
router.get('/', ctrlWrapper(getAllToursController));
router.get('/:id', isValidId, ctrlWrapper(getTourByIdController));
router.post('/:id/like', userAuth, isValidId, ctrlWrapper(likeTourController));

// Admin
router.post(
  '/',
  adminAuth,
  upload.single('image'),
  validateBody(addTourSchema),
  ctrlWrapper(addTourController),
);
router.put(
  '/:id',
  isValidId,
  upload.single('image'),
  validateBody(updateTourSchema),
  ctrlWrapper(updateTourController),
);
router.delete('/:id', adminAuth, isValidId, ctrlWrapper(deleteTourController));

export default router;
