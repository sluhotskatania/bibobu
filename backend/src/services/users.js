import { UsersCollection } from '../models/user.js';

export const getUsers = async () => {
  const users = await UsersCollection.find().select('name photo');
  return users;
};
