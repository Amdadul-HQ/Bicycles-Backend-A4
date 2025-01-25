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
    getRevenue
}