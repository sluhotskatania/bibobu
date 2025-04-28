import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userAuth } from '../middlewares/userAuth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

import {
  getProfileController,
  updateProfileController,
} from '../controllers/profile.js';

import { updateProfileSchema } from '../validation/profile.js';

const router = Router();

router.get('/', userAuth, ctrlWrapper(getProfileController));

router.put(
  '/',
  userAuth,
  upload.single('photo'),
  validateBody(updateProfileSchema),
  ctrlWrapper(updateProfileController),
);

export default router;
