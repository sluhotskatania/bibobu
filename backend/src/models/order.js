import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const orderSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrdersCollection = db.model('order', orderSchema);
