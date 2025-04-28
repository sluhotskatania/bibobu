import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    minimumAge: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ToursCollection = db.model('tour', tourSchema);
