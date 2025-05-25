/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface IProduct {
  name: string;
  image: string;
  brand: string;
  price: number;
  category: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  store: Types.ObjectId; // 👈 Reference to the Store
}

export interface IProductModel extends Model<IProduct> {
    isProductExists(id: string): Promise<IProduct | null>;
}