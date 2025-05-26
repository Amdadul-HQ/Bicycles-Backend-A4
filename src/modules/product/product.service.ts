import mongoose, { Types } from "mongoose";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { AppError } from "../../app/errors/AppError";
import { sendImageToCloudinary } from "../../app/utils/sendImageTOCloudinary";
import { ProductSearchableFields } from "./product.constant";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import httpStatus from 'http-status';
import { Store } from "../store/store.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const productCreateIntoDB = async (file: any, product: IProduct) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (file) {
      const path = file.path;
      const imageName = `${product.name}`;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      product.image = secure_url as string;
    }

    // ✅ Step 1: Create product
    const createdProduct = await Product.create([product], { session });

    // ✅ Step 2: Push product to store's storeProducts
    const updatedStore = await Store.findByIdAndUpdate(
      product.store,
      {
        $push: { storeProducts: createdProduct[0]._id },
      },
      { new: true, session }
    );

    if (!updatedStore) {
      throw new AppError(httpStatus.NOT_FOUND, 'Store not found');
    }

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    return createdProduct[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Get All Product 
const getAllProductFromDB = async (query:Record<string,unknown>) => {

  const getAllProductQuery = new QueryBuilder(
    Product.find(),
    query,
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await getAllProductQuery.modelQuery;
  return result;
};

// Get Single Product
const getSingleProductFromDB = async(id:Types.ObjectId) =>{

    const isProductExist = await Product.isProductExists(id)

    if(!isProductExist){
      throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found!!');
    }
    const result = await Product.findById(id);
    return result
}

// Update Single Product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductIntoDB = async(id:Types.ObjectId,product:IProduct,file:any)=>{

  const isProductExist = await Product.isProductExists(id);
  // console.log(isProductExist);
  if(!isProductExist){
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }

  if(file){
    const path = file?.path;

     //upload image
     const imageName = `${product.name}`;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    product.image = secure_url as string;
  }


  const result = await Product.findByIdAndUpdate(id, {...product}, { new: true });
  // console.log(result,'result');
  return result;
}

// Delete Single Product
const deleteProductFromDB = async(id:Types.ObjectId) =>{

  const isProductExist = await Product.isProductExists(id)

  if(!isProductExist){
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }
  
  const result = await Product.findByIdAndDelete(id);

  return result;
}

export const ProductServices = {
    productCreateIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB
}