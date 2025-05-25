import express, { NextFunction, Request, Response } from "express";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../app/utils/sendImageTOCloudinary";
import validateRequest from "../../app/middleware/validateRequest";
import { StoreValidationSchema } from "./store.validation";
import { StoreController } from "./store.controller";

const router = express.Router();

// create a product
router.post('/apply-for-store',
    auth(USER_ROLE.customer),
    upload.single('file'),
    (req:Request,res:Response,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data);
    console.log('heallo')
    next()
  },
  validateRequest(StoreValidationSchema.createStoreValidationSchema),
  StoreController.applyForStore);

export const StoreRoutes = router