import { Request, Response } from "express";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { StoreService } from "./store.service";
import httpStatus from 'http-status';
import { IStore } from "./store.interface";
import { sendImageToCloudinary } from "../../app/utils/sendImageTOCloudinary";
import { AppError } from "../../app/errors/AppError";

const applyForStore = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.id; 
  const { shopName, shopAddress, phone } = req.body;

  const path =req.file?.path as string;
  
  //upload image
  const imageName = `${shopName}`;
  
  const { secure_url } = await sendImageToCloudinary(imageName, path);

  if(!userId || !secure_url){
    throw new AppError(httpStatus.BAD_REQUEST,'User Access Denied')
  }

  const storeData:IStore = {
      user: userId,
      shopAddress,
      shopName,
      phone,
      profileImage: secure_url as string,
      storeProducts: [],
      status: "pending"
  }

  const newStore = await StoreService.createStore(storeData); // casting to IStore

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Store application submitted successfully.",
    data: newStore,
  });
});


export const StoreController = {
    applyForStore
}