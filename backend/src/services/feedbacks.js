import { FeedbacksCollection } from '../models/feedback.js';

export const addFeedback = async (feedbackData) => {
  const feedback = await FeedbacksCollection.create(feedbackData);
  return feedback;
};

export const getFeedbacksByTour = async (tourId) => {
  const feedbacks = await FeedbacksCollection.find({ tourId });
  return feedbacks;
};

export const getFeedbacksByUser = async (userId) => {
  const feedbacks = await FeedbacksCollection.find({ userId });
  return feedbacks;
};

export const deleteFeedback = async (feedbackId, userId) => {
  const feedback = await FeedbacksCollection.findById(feedbackId);

  if (!feedback || feedback.userId.toString() !== userId.toString()) {
    return null;
  }

  await FeedbacksCollection.findByIdAndDelete(feedbackId);
  return feedback;
};
