/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { ProductServices } from './product.service';
import sendResponse from '../../app/utils/sendResponse';
import { catchAsync } from "../../app/utils/catchAsync";
import { AppError } from "../../app/errors/AppError";

// Create a Product
const createProduct = catchAsync(async (req, res) => {

      const product = req.body;

      const userId = req?.user?.id

      if(!userId){
        throw new AppError(httpStatus.BAD_GATEWAY,"User Access Denied")
      }
      
      const result = await ProductServices.productCreateIntoDB(req.file,product,userId);

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

    const {id} = req.params;
    const result = await ProductServices.getSingleProductFromDB(id as any);
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
    
    const result = await ProductServices.updateProductIntoDB(productId as any,updateData,req?.file);

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
    const result = await ProductServices.deleteProductFromDB(productId as any);

    if(result){
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product Deleted Successfully',
      data: null,
    });
  }
  
});

const getVendorProduct = catchAsync(async(req,res) => {
  const userId = req?.user?.id
  if(!userId){
    throw new AppError(httpStatus.BAD_REQUEST,"User Access Denied")
  }
  const result = await ProductServices.getVendorProductFromDB(userId,req.query);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Products Retrieve successfully',
        data: result,
      });
})

export const ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getVendorProduct
}