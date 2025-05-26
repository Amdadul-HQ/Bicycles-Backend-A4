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
    next()
  },
  validateRequest(StoreValidationSchema.createStoreValidationSchema),
  StoreController.applyForStore);

router.get('/my-store',
  auth(USER_ROLE.vendor),
  StoreController.getMyStore
)

router.patch('/update-store/:id',
      auth(USER_ROLE.vendor),
      upload.single('file'),
      (req:Request,res:Response,next:NextFunction)=>{
      req.body = JSON.parse(req.body.data);
      next()
  },
  validateRequest(StoreValidationSchema.updateStoreValidationScham),
  StoreController.updateStore
)

export const StoreRoutes = router