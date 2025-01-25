import { Model } from "mongoose";

export interface IProduct {
    name:string,
    image:string,
    brand:string,
    price:number,
    category:"Mountain" | "Road" | "Hybrid" | "BMX" | "Electric",
    description:string,
    quantity:number,
    inStock:boolean,
    isDeleted:boolean
}

export interface IProductModel extends Model<IProduct> {
    isProductExists(id: string): Promise<IProduct | null>;
}