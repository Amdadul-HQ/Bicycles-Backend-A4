
import { IUser } from "./user.interface";
import { User } from "./user.model";

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

export const UserService = {
    userSignUpInToDB,
    getMe,
}