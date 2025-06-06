import { model, Schema } from "mongoose";
import { IStore } from "./store.interface";

const storeSchema =  new Schema<IStore>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one store per user
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    shopAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "", // optional: can set a default image URL
    },
    status:{
      type: String,
      enum: ['active', 'pending','blocked'],
      default: 'pending',
      select: true,
    },
    storeProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product', // 👈 Replace with your product model name if different
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order', // 👈 Replace with your product model name if different
      },
    ],
    totalIncome:{
        type:Number,
        default:0
    }

  },
  { timestamps: true },
);

export const Store = model<IStore>('Store', storeSchema);