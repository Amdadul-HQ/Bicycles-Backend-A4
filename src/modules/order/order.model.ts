import { model, Schema } from "mongoose";
import { IOrder, IOrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: String, required: true,ref:'Product' },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true })

orderSchema.statics.isOrderExists = async function (
  id: string,
) {
  const existOrder = await Order.findById(id);
  return existOrder;
};

export const Order = model<IOrder,IOrderModel>('Order',orderSchema)