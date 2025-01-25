import { IUser } from "./user.interface";
import { User } from "./user.model";

const signUpInToDB = async(payload:IUser)=>{
    const result = await User.create(payload)
    return result;
}

export const UserService = {
    signUpInToDB
}