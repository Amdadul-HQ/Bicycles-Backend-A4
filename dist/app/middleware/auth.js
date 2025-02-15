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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../errors/AppError");
const catchAsync_1 = require("../utils/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../../modules/user/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // validation
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        // is token sended
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { email, role, userId } = decoded;
        if (!email || !role || !userId) {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, "Please Login Again");
        }
        const isUserExists = yield user_model_1.User.isUserExists(userId);
        if (!isUserExists) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, "This user is not found!");
        }
        ;
        const isBlocked = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isBlocked;
        if (isBlocked) {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, 'This User is Already Blocked!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
