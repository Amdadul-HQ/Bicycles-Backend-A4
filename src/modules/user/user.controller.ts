import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { UserService } from "./user.service";

const userSingUp = catchAsync(async(req,res)=>{
    const result = await UserService.signUpInToDB(req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'User Sign Up Successfully',
        data:result
    })
})


export const UserController = {
    userSingUp
}