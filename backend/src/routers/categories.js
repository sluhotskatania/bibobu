import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllCategoriesController } from '../controllers/categories.js';

const router = Router();

router.get('/', ctrlWrapper(getAllCategoriesController));

export default router;
