import { UsersCollection } from '../models/user.js';

export const getProfile = async (userId) => {
  const user = await UsersCollection.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateProfile = async (userId, updateData) => {
  const allowedUpdates = ['name', 'bio', 'photo'];
  const updates = Object.keys(updateData).filter((key) =>
    allowedUpdates.includes(key),
  );

  if (updates.length === 0) {
    throw new Error('No valid fields to update');
  }

  const user = await UsersCollection.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true, select: '-password' },
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
