import express from "express";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import validateRequest from "../../app/middleware/validateRequest";

const AuthRoute = express.Router();

// Register
AuthRoute.post('/register',validateRequest(userValidation.createUserValidationSchema),UserController.registerUser);


// Login 
AuthRoute.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.loginuser);



export const AuthRoutes = AuthRoute;
