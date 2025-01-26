/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IOrder {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  status: boolean;
}

export interface IOrderModel extends Model<IOrder> {
    isOrderExists(id: string): Promise<IOrder | null>;
}