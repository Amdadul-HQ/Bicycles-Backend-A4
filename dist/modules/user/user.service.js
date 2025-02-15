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
exports.UserService = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../app/errors/AppError");
const userSignUpInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getMe = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.role) === role) {
        return user;
    }
    return null;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(user_constant_1.userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(id);
    if (!user) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User Not Found!!');
    }
    const deletedUser = yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    return deletedUser;
});
exports.UserService = {
    userSignUpInToDB,
    getMe,
    getAllUsersFromDB,
    deleteUserFromDB
};
