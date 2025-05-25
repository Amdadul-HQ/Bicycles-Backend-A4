/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

type BicycleCategory =
  | "Mountain"
  | "Road"
  | "Hybrid"
  | "Gravel"
  | "Electric"
  | "Cruiser"
  | "BMX"
  | "Folding"
  | "City"
  | "Touring"
  | "Fat Tire"
  | "Fixie";

export interface IProduct {
  name: string;
  image: string;
  brand: string;
  price: number;
  category: BicycleCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  store: Types.ObjectId; // 👈 Reference to the Store
}

export interface IProductModel extends Model<IProduct> {
    isProductExists(id: Types.ObjectId): Promise<IProduct | null>;
}