import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';

// User
export const registerUserController = async (req, res, next) => {
  const data = await registerUser(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a user',
    user: data.user,
    accessToken: data.session.accessToken,
  });
};

export const loginUserController = async (req, res, next) => {
  const data = await loginUser(req.body);

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in a user',
    user: data.user,
    accessToken: data.session.accessToken,
    refreshToken: data.session.refreshToken,
    expiresIn: 900,
  });
};

export const refreshUserController = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is missing' });
  }

  const data = await refreshUserSession({ refreshToken });

  res.status(200).send({
    user: data.user,
    accessToken: data.session.accessToken,
    refreshToken: data.session.refreshToken,
    expiresIn: 900,
  });
};

export const logoutUserController = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is missing' });
  }

  await logoutUser(refreshToken);

  res.status(204).send();
};

export const requestResetEmailController = async (req, res, next) => {
  await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res, next) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
