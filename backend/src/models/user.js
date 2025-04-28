import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));
const appDomain = env('APP_DOMAIN');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    boughtTours: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'tour',
      default: [],
    },
    likedTours: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'tour',
    },
    bio: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
      default: `${appDomain}/uploads/profiles/default-profile.png`,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = db.model('user', userSchema);
