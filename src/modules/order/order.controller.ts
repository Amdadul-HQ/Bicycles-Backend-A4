import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { OrderServices } from './order.service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req, res) => {

    const order = req.body;
    
    const result = await OrderServices.orderCreateIntoDB(order)
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
  const email = req?.user?.email 
  const result = await OrderServices.getUserOrderFromDB(email);
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
  const email = req?.user?.email
  const result = await OrderServices.deleteOrderFromDB(orderid,email)
  if(result){
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Order Deleted',
      data:null
    })
  }
})

// order update
// const orderUpdate = catchAsync(async(req,res)=>{
//   // const 
// })

// Get Total Revenue;

const getRevenue = async(req:Request,res:Response) =>{
    try{
        const totalRevenue = await OrderServices.getRevenueFromDB()
        res.status(200).json({
          message: 'Revenue calculated successfully',
          success: true,
          data: {
            totalRevenue,
          },
        });
    }
    catch(error:unknown){
        res.status(401).send({
          message:'something went worng',
          success :false,
          data:error
        })
    }
}



export const OrderController = {
    createOrder,
    getRevenue,
    getAllOrder,
    getSingleOrder,
    getUserOrder,
    deleteOrder
}