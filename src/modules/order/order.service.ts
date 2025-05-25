/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import { AppError } from "../../app/errors/AppError";
import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import httpStatus from 'http-status';
import Stripe from 'stripe';
import config from "../../app/config";
import { Store } from "../store/store.model";


const orderCreateIntoDB = async (order: IOrder) => {
  const { product, quantity, totalPrice } = order;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // ✅ Step 1: Get Product Details
    const productDetails = await Product.isProductExists(product);

    if (!productDetails) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found!!');
    }

    if (productDetails.quantity < quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Product Out of Stock!!');
    }

    // ✅ Step 2: Update Product Stock
    const updatedProduct = await Product.findByIdAndUpdate(
      product,
      {
        $inc: { quantity: -quantity },
        inStock: productDetails.quantity - quantity > 0,
      },
      { new: true, session }
    );

    if (!updatedProduct) {
      throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to update product stock');
    }

    // ✅ Step 3: Create the Order
    const [createdOrder] = await Order.create([order], { session });

    // ✅ Step 4: Update Store's Total Income
    const storeId = productDetails.store;


    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      {
        $inc: { totalIncome: totalPrice },
        $push: { orders: createdOrder._id },
      },
      { new: true, session }
    );

    if (!updatedStore) {
      throw new AppError(httpStatus.NOT_FOUND, 'Associated store not found!');
    }

    await session.commitTransaction();
    session.endSession();

    return createdOrder;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message || 'Order failed');
  }
};

// get all the order
const getAllOrderFromDB = async () => {
  const result = await Order.find();
  return result
}

// payment intent
const paymentIntent = async (totalPrice:number) => {
  const stripe = new Stripe(config.stripe_secret_key as string, {
    apiVersion: '2024-12-18.acacia',// Use the latest API version
  });
  if(totalPrice < 1){
    throw new AppError(httpStatus.NOT_FOUND, 'Price low!!');
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice, // Convert to cents
    currency: 'usd',
  });

  return paymentIntent;

}

// get single order
const getSingleOrderFromDB = async(id:string)=>{

  const order = await Order.isOrderExists(id);
  if(!order){
    throw new AppError(httpStatus.NOT_FOUND, 'Order Not Found!!');
  }
  const result = Order.findById(id).populate('product')
  return result;
}

// get user order 
const getUserOrderFromDB = async(userId:string)=>{
  const result = await Order.find({user:userId});
  return result;
}

// delete order 
const deleteOrderFromDB = async(id:string,userId:Types.ObjectId)=>{
  const isOrderExists = await Order.isOrderExists(id);
  if(!isOrderExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Order Not Found!!');
  }
  if(isOrderExists?.user !== userId){
    throw new AppError(httpStatus.UNAUTHORIZED, 'UnAuthorized!!');
  }
  const result = await Order.findByIdAndDelete(id)
  return result
}

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
    getRevenueFromDB,
    getAllOrderFromDB,
    getSingleOrderFromDB,
    getUserOrderFromDB,
    deleteOrderFromDB,
    paymentIntent
}
