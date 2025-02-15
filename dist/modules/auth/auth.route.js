"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const user_validate_1 = require("../user/user.validate");
const user_controller_1 = require("../user/user.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const AuthRoute = express_1.default.Router();
// Sign up
AuthRoute.post('/signup', (0, validateRequest_1.default)(user_validate_1.userValidation.createUserValidationSchema), user_controller_1.UserController.userSingUp);
// Login 
AuthRoute.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
AuthRoute.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidation), auth_controller_1.AuthController.refreshToken);
// my info
AuthRoute.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getMe);
exports.AuthRoutes = AuthRoute;
