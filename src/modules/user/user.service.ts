
import config from "../../app/config";
import { AppError } from "../../app/errors/AppError";
import { createToken } from "../auth/auth.utils";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const userSignUpInToDB = async(payload:IUser)=>{
    const result = await User.create(payload)

    if (!result._id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user create problem');
    }
    const jwtPayload = {
        id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
    };
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire as string
    );
    return {
        token:accessToken,
        result
    };
}

const getMe = async (userId: string, role: string) => {
    const user = await User.findOne({ _id: userId });
    if(user?.role === role ){
        return user;
    }
    return null
  };

export const UserService = {
    userSignUpInToDB,
    getMe,
}