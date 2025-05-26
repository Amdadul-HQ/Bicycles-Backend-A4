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
      status: "pending",
      totalIncome:0,
      orders:[]
  }

  const newStore = await StoreService.createStore(storeData); // casting to IStore

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Store application submitted successfully.",
    data: newStore,
  });
});

const getMyStore = catchAsync(async(req:Request,res:Response) => {
const userId = req?.user?.id


const myStore = await StoreService.getMyStore(userId); // casting to IStore

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Store Data Fetched successfully.",
    data: myStore,
  });
})


const updateStore = catchAsync(async(req:Request,res:Response) => {
  const {id} = req.params
  const userId = req?.user?.id; 
  const { shopName } = req.body;

  const path =req.file?.path as string;
  let updateStore = req.body
  if(path){
    const imageName = `${shopName}`;
    
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    updateStore = {...updateStore,profileImage:secure_url}
  }
  
  //upload image

  if(!userId){
    throw new AppError(httpStatus.BAD_REQUEST,'User Access Denied')
  }
  const result = await StoreService.updateStore(id,updateStore)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Store Updated successfully.",
    data: result,
  });
})

export const StoreController = {
    applyForStore,
    getMyStore,
    updateStore
}