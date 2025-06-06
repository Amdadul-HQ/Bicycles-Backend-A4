import { AppError } from '../../app/errors/AppError';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { OrderServices } from './order.service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req, res) => {

    const order = req.body;
    const userId = req?.user?.id
  if(!userId){
    throw new AppError(httpStatus.BAD_GATEWAY,"User Access Denied")
  }
    
    const result = await OrderServices.orderCreateIntoDB(order,userId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order Placed Successfully',
      data: result,
    });
});

// get all the order
const getAllOrder = catchAsync(async(req,res)=>{
  const result = await OrderServices.getAllOrderFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders',
    data: result,
  });
})

// get vendor the order
const getVendorOrder = catchAsync(async(req,res)=>{
  const userId = req?.user?.id
  if(!userId){
    throw new AppError(httpStatus.BAD_REQUEST,"User Access denied")
  }
  const result = await OrderServices.getVendorOrderFromDB(userId,req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vendor orders',
    data: result,
  });
})

// get single order
const getSingleOrder = catchAsync(async(req,res)=>{
  const result= await OrderServices.getSingleOrderFromDB(req.params.orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Details',
    data: result,
  });
})

// get user order
const getUserOrder = catchAsync(async(req,res)=>{
  const userId = req?.user?.id
  const result = await OrderServices.getUserOrderFromDB(userId,req.query);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'User Orders',
    data:result
  })
})

// delete order 
const deleteOrder = catchAsync(async(req,res)=>{
  const orderid = req.params.orderId;
  const id = req?.user?.id
  const result = await OrderServices.deleteOrderFromDB(orderid,id)
  if(result){
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Order Deleted',
      data:null
    })
  }
})

// payment intent
const paymentIntent = catchAsync(async(req,res)=>{
  const price :number = req.body.amount;
  

  const priceInCent = price*100

  const result = await OrderServices.paymentIntent(priceInCent)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Create Payment Indent',
    data:result
  })
})

// order update
// const orderUpdate = catchAsync(async(req,res)=>{
//   // const 
// })

// Get Total Revenue;

const getRevenue = catchAsync(async(req:Request,res:Response) =>{
        const totalRevenue = await OrderServices.getRevenueFromDB()
        sendResponse(res,{
          statusCode:httpStatus.OK,
          success:true,
          message:'Total Revenue',
          data:totalRevenue
        })
})



export const OrderController = {
    createOrder,
    getRevenue,
    getAllOrder,
    getSingleOrder,
    getUserOrder,
    deleteOrder,
    paymentIntent,
    getVendorOrder
}