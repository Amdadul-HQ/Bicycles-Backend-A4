import { model, Schema } from "mongoose";
import { IOrder, IOrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
     user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true })

orderSchema.statics.isOrderExists = async function (
  id: string,
) {
  const existOrder = await Order.findById(id);
  return existOrder;
};

export const Order = model<IOrder,IOrderModel>('Order',orderSchema)