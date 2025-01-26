import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const userSingUp = catchAsync(async(req,res)=>{
    const result = await UserService.userSignUpInToDB(req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'User Sign Up Successfully',
        data:result
    })
})

const getMe = catchAsync(async (req, res) => {
    const { userId, role } = req.user as JwtPayload;
    
    const result = await UserService.getMe(userId, role);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  });


export const UserController = {
    userSingUp,
    getMe
}