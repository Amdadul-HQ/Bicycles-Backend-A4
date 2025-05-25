/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId; // reference to User
  product: Types.ObjectId; // reference to Product
  store: Types.ObjectId; // reference to Store (optional but useful for vendor tracking)
  quantity: number;
  totalPrice: number;
  status: boolean;
}

export interface IOrderModel extends Model<IOrder> {
    isOrderExists(id: string): Promise<IOrder | null>;
}