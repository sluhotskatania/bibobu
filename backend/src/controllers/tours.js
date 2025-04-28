import createHttpError from 'http-errors';
import {
  getAllTours,
  getTourById,
  addTour,
  updateTour,
  deleteTour,
  likeTour,
} from '../services/tours.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getAllToursController = async (req, res, next) => {
  const tours = await getAllTours();

  res.status(200).send({
    status: 200,
    message: 'Successfully found all tours',
    data: tours,
  });
};

export const getTourByIdController = async (req, res, next) => {
  const { id } = req.params;
  const tour = await getTourById(id);

  if (!tour) {
    return next(createHttpError(404, 'Tour not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found tour with id ${id}`,
    data: tour,
  });
};

// Admin
export const addTourController = async (req, res, next) => {
  const image = req.file; // Отримуємо файл із запиту

  let imageUrl = null;
  if (image) {
    imageUrl = await saveFileToUploadDir(image, 'tours'); // Зберігаємо файл і отримуємо URL
  }

  const payload = {
    title: req.body.title,
    description: req.body.description,
    minimumAge: req.body.minimumAge,
    category: req.body.category,
    price: req.body.price,
    image: imageUrl,
  };

  const newTour = await addTour(payload);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a new tour',
    data: newTour,
  });
};

export const updateTourController = async (req, res, next) => {
  const { id } = req.params;
  const image = req.file;

  let imageUrl = req.body.image || null;
  if (image) {
    imageUrl = await saveFileToUploadDir(image, 'tours');
  }

  const payload = {
    title: req.body.title,
    description: req.body.description,
    minimumAge: req.body.minimumAge,
    category: req.body.category,
    price: req.body.price,
    image: imageUrl,
  };

  const updatedTour = await updateTour(id, payload, { upsert: true });

  if (!updatedTour) {
    return next(createHttpError(404, 'Tour not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated tour with id ${id}`,
    data: updatedTour,
  });
};

export const deleteTourController = async (req, res, next) => {
  const { id } = req.params;

  const deletedTour = await deleteTour(id);

  if (!deletedTour) {
    return next(createHttpError(404, 'Tour not found'));
  }

  res.status(204).send();
};

export const likeTourController = async (req, res, next) => {
  const { id: tourId } = req.params;
  const userId = req.user._id;

  const result = await likeTour(userId, tourId);

  res.status(200).send({
    status: 200,
    message: result.liked
      ? 'Tour successfully liked'
      : 'Tour successfully unliked',
    data: { likes: result.likes },
  });
};
