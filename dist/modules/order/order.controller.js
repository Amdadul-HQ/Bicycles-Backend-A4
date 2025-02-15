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
exports.OrderController = void 0;
const catchAsync_1 = require("../../app/utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const order_service_1 = require("./order.service");
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const result = yield order_service_1.OrderServices.orderCreateIntoDB(order);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Placed Successfully',
        data: result,
    });
}));
// get all the order
const getAllOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.getAllOrderFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All orders',
        data: result,
    });
}));
// get single order
const getSingleOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.getSingleOrderFromDB(req.params.orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Details',
        data: result,
    });
}));
// get user order
const getUserOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    const result = yield order_service_1.OrderServices.getUserOrderFromDB(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Orders',
        data: result
    });
}));
// delete order 
const deleteOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orderid = req.params.orderId;
    const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    const result = yield order_service_1.OrderServices.deleteOrderFromDB(orderid, email);
    if (result) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order Deleted',
            data: null
        });
    }
}));
// payment intent
const paymentIntent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const price = req.body.amount;
    console.log(req.body);
    const priceInCent = price * 100;
    const result = yield order_service_1.OrderServices.paymentIntent(priceInCent);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Create Payment Indent',
        data: result
    });
}));
// order update
// const orderUpdate = catchAsync(async(req,res)=>{
//   // const 
// })
// Get Total Revenue;
const getRevenue = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalRevenue = yield order_service_1.OrderServices.getRevenueFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Total Revenue',
        data: totalRevenue
    });
}));
exports.OrderController = {
    createOrder,
    getRevenue,
    getAllOrder,
    getSingleOrder,
    getUserOrder,
    deleteOrder,
    paymentIntent
};
