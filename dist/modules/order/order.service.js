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
exports.OrderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../../app/errors/AppError");
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const http_status_1 = __importDefault(require("http-status"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../app/config"));
const orderCreateIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity } = order;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const productDetails = yield product_model_1.Product.isProductExists(product);
        if (!productDetails) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Product Not Found!!');
        }
        if (productDetails.quantity < quantity) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Product Out of Stock!!');
        }
        productDetails.quantity -= quantity;
        if (productDetails.quantity === 0) {
            productDetails.inStock = false;
        }
        const updateProduct = yield product_model_1.Product.findByIdAndUpdate(product, { $inc: { quantity: -quantity }, inStock: productDetails.quantity > quantity }, { session });
        // const stripeSession = await stripe.checkout.sessions.create({
        //   payment_method_types: ['card'],
        //   line_items: [
        //     {
        //       price_data: {
        //         currency: 'usd',
        //         product_data: {
        //           name: productDetails.name,
        //           description: `Quantity of ${quantity}`,
        //         },
        //         unit_amount: order.totalPrice * 100, // Convert to cents
        //       },
        //       quantity: 1,
        //     },
        //   ],
        //   mode: 'payment',
        //   success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        //   cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        //   // metadata: {
        //   //   orderId: order.,
        //   // },
        // });
        // console.log(stripeSession);
        if (!updateProduct) {
            throw new AppError_1.AppError(http_status_1.default.BAD_GATEWAY, 'Failed to Place Order');
        }
        const result = yield order_model_1.Order.create([order], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
// get all the order
const getAllOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
// payment intent
const paymentIntent = (totalPrice) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = new stripe_1.default(config_1.default.stripe_secret_key, {
        apiVersion: '2024-12-18.acacia', // Use the latest API version
    });
    if (totalPrice < 1) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Price low!!');
    }
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: totalPrice, // Convert to cents
        currency: 'usd',
    });
    return paymentIntent;
});
// get single order
const getSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.isOrderExists(id);
    if (!order) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Order Not Found!!');
    }
    const result = order_model_1.Order.findById(id).populate('product');
    return result;
});
// get user order 
const getUserOrderFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ email });
    return result;
});
// delete order 
const deleteOrderFromDB = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExists = yield order_model_1.Order.isOrderExists(id);
    if (!isOrderExists) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Order Not Found!!');
    }
    if ((isOrderExists === null || isOrderExists === void 0 ? void 0 : isOrderExists.email) !== email) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'UnAuthorized!!');
    }
    const result = yield order_model_1.Order.findByIdAndDelete(id);
    return result;
});
// get revenue
const getRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.Order.aggregate([
        {
            $group: {
                _id: null, // Group all documents
                totalRevenue: { $sum: '$totalPrice' }, // Sum all `totalPrice`
            },
        },
    ]);
    const totalRevenue = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
    return totalRevenue;
});
exports.OrderServices = {
    orderCreateIntoDB,
    getRevenueFromDB,
    getAllOrderFromDB,
    getSingleOrderFromDB,
    getUserOrderFromDB,
    deleteOrderFromDB,
    paymentIntent
};
