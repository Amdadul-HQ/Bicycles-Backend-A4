"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/create-payment-intent', 
// auth(USER_ROLE.customer),
order_controller_1.OrderController.paymentIntent);
// Order place
router.post('/place-order', 
// auth(USER_ROLE.customer),
(0, validateRequest_1.default)(order_validation_1.orderSchema), order_controller_1.OrderController.createOrder);
// get all the order info 
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderController.getAllOrder);
//get single order
router.get('/:orderId', order_controller_1.OrderController.getSingleOrder);
// get user orders
router.get('/user/order', (0, auth_1.default)(user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.admin), order_controller_1.OrderController.getUserOrder);
// Order Update
// router.patch('/user/:orderId',auth(USER_ROLE.customer),OrderController.)
// delete order
router.delete('/user/:orderId', (0, auth_1.default)(user_constant_1.USER_ROLE.customer), order_controller_1.OrderController.deleteOrder);
// Order Revenue
router.get('/total/revenue', 
// auth(USER_ROLE.admin),
order_controller_1.OrderController.getRevenue);
exports.OrderRouter = router;
