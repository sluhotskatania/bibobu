import { ToursCollection } from '../models/tour.js';
import { UsersCollection } from '../models/user.js';

export const getAllTours = async () => {
  const tours = await ToursCollection.find().exec();

  return tours;
};

export const getTourById = async (tourId) => {
  const tour = await ToursCollection.findOne({
    _id: tourId,
  });

  return tour;
};

export const addTour = async (tourData) => {
  const newTour = await ToursCollection.create(tourData);

  return newTour;
};

export const updateTour = async (tourId, tourData, options = {}) => {
  const updatedTour = await ToursCollection.findOneAndUpdate(
    { _id: tourId },
    tourData,
    {
      new: true,
      includeResultMetadata: false,
      ...options,
    },
  );

  return updatedTour;
};

export const deleteTour = async (tourId) => {
  const deletedTour = await ToursCollection.findOneAndDelete({ _id: tourId });
  return deletedTour;
};

export const likeTour = async (userId, tourId) => {
  const tour = await ToursCollection.findById(tourId);
  if (!tour) {
    throw new Error('Tour not found');
  }

  const user = await UsersCollection.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const isAlreadyLiked = user.likedTours.includes(tourId);

  if (isAlreadyLiked) {
    user.likedTours = user.likedTours.filter((id) => id.toString() !== tourId);
    tour.likes -= 1;
  } else {
    user.likedTours.push(tourId);
    tour.likes += 1;
  }

  await user.save();
  await tour.save();

  return { liked: !isAlreadyLiked, likes: tour.likes };
};
