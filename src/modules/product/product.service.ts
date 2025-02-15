import QueryBuilder from "../../app/builder/QueryBuilder";
import { AppError } from "../../app/errors/AppError";
import { sendImageToCloudinary } from "../../app/utils/sendImageTOCloudinary";
import { ProductSearchableFields } from "./product.constant";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const productCreateIntoDB = async (file:any,product: IProduct)=>{
  if(file){
    const path = file?.path;

     //upload image
     const imageName = `${product.name}`;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    product.image = secure_url as string;
    console.log(product,'f');
    const result = await Product.create(product);
    console.log(result,'hello');
    return result;
  }
}

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
const getSingleProductFromDB = async(id:string) =>{

    const isProductExist = await Product.isProductExists(id)

    if(!isProductExist){
      throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found!!');
    }
    const result = await Product.findById(id);
    return result
}

// Update Single Product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductIntoDB = async(id:string,product:IProduct,file:any)=>{

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

  console.log(product,'update');

  const result = await Product.findByIdAndUpdate(id, {...product}, { new: true });
  // console.log(result,'result');
  return result;
}

// Delete Single Product
const deleteProductFromDB = async(id:string) =>{

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