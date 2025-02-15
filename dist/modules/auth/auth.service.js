"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../app/config"));
const AppError_1 = require("../../app/errors/AppError");
const auth_utils_1 = require("./auth.utils");
const user_model_1 = require("../user/user.model");
const loginUserInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const isUserExists = yield user_model_1.User.findOne({ email: payload.email }).select("+password +role");
    if (!isUserExists) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    const isBlocked = isUserExists.isBlocked;
    if (isBlocked) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This user is Blocked');
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload.password, isUserExists.password))) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'Password not matched');
    }
    const jwtPayload = {
        userId: isUserExists._id,
        email: isUserExists.email,
        role: isUserExists.role,
    };
    //create token and send to client
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire);
    return {
        token: accessToken,
        refreshToken,
    };
});
const refreshTokenFromDB = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_utils_1.verifyToken)(accessToken, config_1.default.jwt_refresh_secret);
    const { userId } = decoded;
    const isUserExists = yield user_model_1.User.isUserExists(userId);
    console.log(isUserExists);
    if (!isUserExists) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    const jwtPayload = {
        userId: isUserExists._id,
        role: isUserExists.role,
    };
    //create token and send to client
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire);
    return { token };
});
exports.AuthServices = {
    loginUserInToDB,
    refreshTokenFromDB
};
