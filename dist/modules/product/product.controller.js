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
exports.ProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const product_service_1 = require("./product.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const catchAsync_1 = require("../../app/utils/catchAsync");
// Create a Product
const createProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    // console.log(product);
    // console.log(req.file,'helloafasdf');
    const result = yield product_service_1.ProductServices.productCreateIntoDB(req.file, product);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Product Added Successfully',
        statusCode: http_status_1.default.CREATED,
        data: result
    });
}));
// Get All Product
const getAllProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.getAllProductFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Products Retrieve successfully',
        data: result,
    });
}));
// Get A Specific Product
const getSingleProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Product Data Retrieve successfully',
        data: result,
    });
}));
// Update A Specific Product
const updateProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const updateData = req.body;
    const result = yield product_service_1.ProductServices.updateProductIntoDB(productId, updateData, req === null || req === void 0 ? void 0 : req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Update Product Data Successfully',
        data: result,
    });
}));
// Delete A Specific Product
const deleteProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
    if (result) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Product Deleted Successfully',
            data: null,
        });
    }
}));
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
