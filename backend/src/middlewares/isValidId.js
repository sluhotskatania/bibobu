import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const id =
    req.params.tourId ||
    req.params.userId ||
    req.params.id ||
    req.params.feedbackId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, 'Invalid ID format'));
  }

  next();
};
