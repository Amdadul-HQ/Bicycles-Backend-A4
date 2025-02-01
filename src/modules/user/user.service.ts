import QueryBuilder from "../../app/builder/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status';
import { AppError } from "../../app/errors/AppError";

const userSignUpInToDB = async(payload:IUser)=>{
    const result = await User.create(payload)
    return result;
}

const getMe = async (userId: string, role: string) => {
    const user = await User.findOne({ _id: userId });
    if(user?.role === role ){
        return user;
    }
    return null
  };
const getAllUsersFromDB =  async (query: Record<string, unknown>) => {
    const userQuery = new QueryBuilder(
      User.find(),
      query,
    )
      .search(userSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const meta = await userQuery.countTotal();
    const result = await userQuery.modelQuery;
  
    return {
      meta,
      result,
    };
  };

  const deleteUserFromDB = async (id: string) => {

    const user = await User.isUserExists(id);
    
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found!!');
    }
    
    const deletedUser = await User.findByIdAndUpdate(id,{isBlocked:true},{new:true})
  
    return deletedUser
  };

export const UserService = {
    userSignUpInToDB,
    getMe,
    getAllUsersFromDB,
    deleteUserFromDB
}