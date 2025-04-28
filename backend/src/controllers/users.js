import { getUsers } from '../services/users.js';

export const getUsersController = async (req, res, next) => {
  const users = await getUsers();

  res.status(200).send({
    status: 200,
    message: 'Successfully retrieved users',
    data: users,
  });
};
