import mongoose from "mongoose";
import { AppError } from "../../app/errors/AppError";
import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import httpStatus from 'http-status';

const orderCreateIntoDB = async (order: IOrder) => {
  
  const {product,quantity} = order

  const session = await mongoose.startSession();
  try{
    session.startTransaction();

    const productDetails = await Product.isProductExists(product)


    if(!productDetails){
      throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found!!');
    }
  
    if (productDetails.quantity < quantity) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product Out of Stock!!');
    }
  
    productDetails.quantity -= quantity;
  
    if (productDetails.quantity === 0) {
        productDetails.inStock = false;
    }
    
    const updateProduct = await Product.findByIdAndUpdate(
      product, 
      { $inc: { quantity: -quantity }, inStock: productDetails.quantity > quantity }, 
      { session }
    );

    if(!updateProduct){
      throw new AppError(httpStatus.BAD_GATEWAY,'Failed to Place Order')
    }
    console.log(order,'order');
    const result = await Order.create([order],{session});

    await session.commitTransaction();
    await session.endSession();
    return result
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }

};

// get revenue

const getRevenueFromDB = async () =>{
    const result = await Order.aggregate([
      {
        $group: {
          _id: null, // Group all documents
          totalRevenue: { $sum: '$totalPrice' }, // Sum all `totalPrice`
        },
      },
    ]);
    const totalRevenue = result[0]?.totalRevenue || 0 ;
    return totalRevenue
    
}


export const OrderServices = {
    orderCreateIntoDB,
    getRevenueFromDB
}
