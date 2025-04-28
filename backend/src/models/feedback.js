import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tour',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FeedbacksCollection = db.model('feedback', feedbackSchema);
