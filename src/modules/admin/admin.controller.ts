import { Request, Response } from "express";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";

const getAllStores = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.getAllStores();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All stores retrieved successfully",
      data: result,
    });
  });

const approveStore = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {status} = req.body
    console.log(status)
    const result = await AdminService.approveStore(id,status);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Store approved successfully",
      data: result,
    });
  })

const getAllUsers = catchAsync(async(req,res)=>{
  const result = await AdminService.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
})

const deleteUser = catchAsync(async(req,res)=>{
  const { id } = req.params;
  const result = await AdminService.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted successfully',
    data: result,
  });
})
  

export const AdminController = {
    getAllStores,
    approveStore,
    getAllUsers,
    deleteUser
}