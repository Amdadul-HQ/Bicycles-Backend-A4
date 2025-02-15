import httpStatus from "http-status";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import config from "../../app/config";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserInToDB(req.body);

  const { refreshToken, token } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      token,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshTokenFromDB(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Access token get',
    data: result,
  });
});


export const AuthController = {
  loginUser,
  refreshToken
}
