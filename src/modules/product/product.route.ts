import express, { NextFunction, Request, Response } from "express";
import { ProductController } from "./product.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../app/utils/sendImageTOCloudinary";
import validateRequest from "../../app/middleware/validateRequest";
import { productZodSchema } from "./product.validation";

const router = express.Router();

// create a product
router.post('/add-bicycle',
    auth(USER_ROLE.vendor),
    upload.single('file'),
    (req:Request,res:Response,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data);
    next()
  },
  validateRequest(productZodSchema),
  ProductController.createProduct);

// Get All Bicycles
router.get('/',ProductController.getAllProduct);

// Get A Specific Bicycle
router.get('/:productId',ProductController.getSingleProduct)

// Update A Specific Bicycle
router.patch('/:productId',
    auth(USER_ROLE.vendor),
    upload.single('file'),
    (req:Request,res:Response,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data);
    next()
    },
    ProductController.updateProduct)

// Delete A Bicycle
router.delete('/:productId',auth(USER_ROLE.vendor),ProductController.deleteProduct)


export const ProductRoutes = router;