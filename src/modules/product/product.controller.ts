import httpStatus from "http-status";
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import sendResponse from '../../app/utils/sendResponse';
import { catchAsync } from "../../app/utils/catchAsync";

// Create a Product
const createProduct = catchAsync(async (req, res) => {

      const product = req.body;
      
      const result = await ProductServices.productCreateIntoDB(req.file,product);

      sendResponse(res,{
        success:true,
        message:'Product Added Successfully',
        statusCode:httpStatus.CREATED,
        data:result
      })
})

// Get All Product
const getAllProduct = catchAsync(async(req,res) => {
      const result = await ProductServices.getAllProductFromDB(req.query);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Products Retrieve successfully',
        data: result,
      });
})

// Get A Specific Product
const getSingleProduct = catchAsync(async(req,res) => {

    const {productId} = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Product Data Retrieve successfully',
      data: result,
    });
})

// Update A Specific Product
const updateProduct = catchAsync(async (req, res) => {

    const { productId } = req.params;
    const updateData = req.body;
    
    const result = await ProductServices.updateProductIntoDB(productId,updateData,req.file);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Product Data Successfully',
      data: result,
    });
});

// Delete A Specific Product
const deleteProduct = catchAsync(async (req,res) =>{

    const {productId} = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);

    

  //  if (!result) {
  //     res.status(404).send({
  //      message: 'Bicycle not founded',
  //      status: false,
  //    });
  //  }
  //   res.status(200).json({
  //     message: 'Bicycle deleted successfully',
  //     status:true,
  //     data: {}
  //   });
});

export const ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}