import { CategoryCollection } from '../models/category.js';

export const getAllCategories = async () => {
  const categories = await CategoryCollection.find().exec();
  return categories;
};
