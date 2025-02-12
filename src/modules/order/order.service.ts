import mongoose from "mongoose";
import { AppError } from "../../app/errors/AppError";
import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import httpStatus from 'http-status';
import Stripe from 'stripe';
import config from "../../app/config";


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

    // const stripeSession = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: productDetails.name,
    //           description: `Quantity of ${quantity}`,
    //         },
    //         unit_amount: order.totalPrice * 100, // Convert to cents
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    //   // metadata: {
    //   //   orderId: order.,
    //   // },
    // });
    // console.log(stripeSession);

    if(!updateProduct){
      throw new AppError(httpStatus.BAD_GATEWAY,'Failed to Place Order')
    }
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
const getUserOrderFromDB = async(email:string)=>{
  const result = await Order.find({email});
  return result;
}

// delete order 
const deleteOrderFromDB = async(id:string,email:string)=>{
  const isOrderExists = await Order.isOrderExists(id);
  if(!isOrderExists){
    throw new AppError(httpStatus.NOT_FOUND, 'Order Not Found!!');
  }
  if(isOrderExists?.email !== email){
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
