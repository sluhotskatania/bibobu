import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUsersController } from '../controllers/users.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

export default router;
