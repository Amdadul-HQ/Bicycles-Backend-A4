/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  isBlocked: boolean;
}

export interface IUserModel extends Model<IUser> {
    isUserExists(email: string): Promise<IUser>;
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangeTimeStamp: Date,
      jwtIssuedTimeStamp: number,
    ): boolean;
  }