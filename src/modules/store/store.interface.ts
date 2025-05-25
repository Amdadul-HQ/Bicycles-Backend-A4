import { Types } from "mongoose";

export interface IStore {
  user: Types.ObjectId, // Reference to the User
  shopName: string,
  shopAddress: string,
  phone: string,
  storeProducts: Types.ObjectId[];
  status:"active" | "pending" | "blocked",
  profileImage: string,
}