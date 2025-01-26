import httpStatus from "http-status";
import { AppError } from "../errors/AppError";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { User } from "../../modules/user/user.model";
import { TUserRole } from "../../modules/user/user.constant";




const auth = (...requiredRoles:TUserRole[]) => {
  return catchAsync(async (req, res, next) => {

      
      // validation
      const token = req?.headers?.authorization?.split(' ')[1];

      // is token sended
      if(!token){
          throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized');
        }
        
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;


        const {email,role,userId} = decoded

        if(!email || !role || !userId){
            throw new AppError(httpStatus.FORBIDDEN,"Pleasse Login Again")
        }

        const isUserExists = await User.isUserExists(email)
    
        if(!isUserExists){
            throw new AppError(httpStatus.NOT_FOUND,"This user is not found!")
        };
        const isBlocked = isUserExists?.isBlocked
        if(isBlocked){
            throw new AppError(httpStatus.FORBIDDEN,'This User is Already Blocked!')
        }


     if (requiredRoles && !requiredRoles.includes(role)) {
       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
     }
     req.user = decoded
     next();
    
  })
};

export default auth;