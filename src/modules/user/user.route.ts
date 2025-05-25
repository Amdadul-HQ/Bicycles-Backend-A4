import express from 'express';
import { USER_ROLE } from './user.constant';
import auth from '../../app/middleware/auth';
import { UserController } from './user.controller';

const UserRouter = express.Router();

UserRouter.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.customer,USER_ROLE.vendor),
  UserController.getMe,
);


export const UserRoutes = UserRouter;
