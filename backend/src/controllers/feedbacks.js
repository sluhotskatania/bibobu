import {
  addFeedback,
  getFeedbacksByUser,
  deleteFeedback,
  getFeedbacksByTour,
} from '../services/feedbacks.js';

export const addFeedbackController = async (req, res, next) => {
  const payload = {
    userId: req.user._id,
    tourId: req.body.tourId,
    text: req.body.text,
    rating: req.body.rating,
  };

  const feedback = await addFeedback(payload);

  res.status(201).send({
    status: 201,
    message: 'Successfully added feedback',
    data: feedback,
  });
};

export const getFeedbacksByTourController = async (req, res, next) => {
  const { tourId } = req.params;

  const feedbacks = await getFeedbacksByTour(tourId);

  res.status(200).send({
    status: 200,
    message: `Successfully retrieved feedbacks for tour ${tourId}`,
    data: feedbacks,
  });
};

export const getFeedbacksByUserController = async (req, res, next) => {
  const { userId } = req.params;

  const feedbacks = await getFeedbacksByUser(userId);

  res.status(200).send({
    status: 200,
    message: `Successfully retrieved feedbacks for user ${userId}`,
    data: feedbacks,
  });
};

export const deleteFeedbackController = async (req, res, next) => {
  const { feedbackId } = req.params;
  const userId = req.user._id;

  const feedback = await deleteFeedback(feedbackId, userId);

  if (!feedback) {
    return res.status(403).json({
      status: 403,
      message: 'Ви не можете видалити цей відгук',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Відгук успішно видалено',
  });
};
