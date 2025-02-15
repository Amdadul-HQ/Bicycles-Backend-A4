"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const sendImageTOCloudinary_1 = require("../../app/utils/sendImageTOCloudinary");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
// create a product
router.post('/add-bicycle', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), sendImageTOCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(product_validation_1.productZodSchema), product_controller_1.ProductController.createProduct);
// Get All Bicycles
router.get('/', product_controller_1.ProductController.getAllProduct);
// Get A Specific Bicycle
router.get('/:productId', product_controller_1.ProductController.getSingleProduct);
// Update A Specific Bicycle
router.patch('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), sendImageTOCloudinary_1.upload.single('file'), (req, res, next) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
}, product_controller_1.ProductController.updateProduct);
// Delete A Bicycle
router.delete('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
