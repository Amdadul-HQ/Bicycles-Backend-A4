import express from "express";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import validateRequest from "../../app/middleware/validateRequest";
import { userValidation } from "../user/user.validate";

const AuthRoute = express.Router();

// Sign up
AuthRoute.post('/signup',validateRequest(userValidation.createUserValidationSchema),UserController.registerUser);


// Login 
AuthRoute.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.loginuser);



export const AuthRoutes = AuthRoute;
