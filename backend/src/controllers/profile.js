import { getProfile, updateProfile } from '../services/profile.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getProfileController = async (req, res, next) => {
  const userId = req.user._id;

  const user = await getProfile(userId);

  res.status(200).send({
    status: 200,
    message: 'Profile retrieved successfully',
    data: user,
  });
};

export const updateProfileController = async (req, res, next) => {
  const userId = req.user._id;
  const updateData = req.body;

  if (req.file) {
    const photoUrl = await saveFileToUploadDir(req.file, 'profiles');
    updateData.photo = photoUrl;
  }

  const updatedUser = await updateProfile(userId, updateData);

  res.status(200).send({
    status: 200,
    message: 'Profile updated successfully',
    data: updatedUser,
  });
};
