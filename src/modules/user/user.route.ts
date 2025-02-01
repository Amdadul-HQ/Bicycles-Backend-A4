import express from 'express';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';

const UserRouter = express.Router();

UserRouter.get(
  '/',
  auth(USER_ROLE.admin),
  UserController.getAllUsers,
);


UserRouter.delete(
  '/:id',
  auth(USER_ROLE.admin),
  UserController.deleteUser,
);

export const UserRoutes = UserRouter;
