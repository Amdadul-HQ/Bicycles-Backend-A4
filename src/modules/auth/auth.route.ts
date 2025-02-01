import express from "express";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import validateRequest from "../../app/middleware/validateRequest";
import { userValidation } from "../user/user.validate";
import { UserController } from "../user/user.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const AuthRoute = express.Router();

// Sign up
AuthRoute.post('/signup',validateRequest(userValidation.createUserValidationSchema),UserController.userSingUp);


// Login 
AuthRoute.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.loginUser);


AuthRoute.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidation),
  AuthController.refreshToken,
);

// my info
AuthRoute.get(
    '/me',
    auth(
      USER_ROLE.customer,
      USER_ROLE.admin
    ),
    UserController.getMe,
  );


export const AuthRoutes = AuthRoute;
