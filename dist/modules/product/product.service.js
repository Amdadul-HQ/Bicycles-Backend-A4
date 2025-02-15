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
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const AppError_1 = require("../../app/errors/AppError");
const sendImageTOCloudinary_1 = require("../../app/utils/sendImageTOCloudinary");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const http_status_1 = __importDefault(require("http-status"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const productCreateIntoDB = (file, product) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const path = file === null || file === void 0 ? void 0 : file.path;
        //upload image
        const imageName = `${product.name}`;
        const { secure_url } = yield (0, sendImageTOCloudinary_1.sendImageToCloudinary)(imageName, path);
        product.image = secure_url;
        console.log(product, 'f');
        const result = yield product_model_1.Product.create(product);
        console.log(result, 'hello');
        return result;
    }
});
// Get All Product 
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllProductQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield getAllProductQuery.modelQuery;
    return result;
});
// Get Single Product
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield product_model_1.Product.isProductExists(id);
    if (!isProductExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Product Not Found!!');
    }
    const result = yield product_model_1.Product.findById(id);
    return result;
});
// Update Single Product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductIntoDB = (id, product, file) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield product_model_1.Product.isProductExists(id);
    // console.log(isProductExist);
    if (!isProductExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Product Not Found!!');
    }
    if (file) {
        const path = file === null || file === void 0 ? void 0 : file.path;
        //upload image
        const imageName = `${product.name}`;
        const { secure_url } = yield (0, sendImageTOCloudinary_1.sendImageToCloudinary)(imageName, path);
        product.image = secure_url;
    }
    console.log(product, 'update');
    const result = yield product_model_1.Product.findByIdAndUpdate(id, Object.assign({}, product), { new: true });
    // console.log(result,'result');
    return result;
});
// Delete Single Product
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield product_model_1.Product.isProductExists(id);
    if (!isProductExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Product Not Found!!');
    }
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductServices = {
    productCreateIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB
};
