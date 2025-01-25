import QueryBuilder from "../../app/builder/QueryBuilder";
import { sendImageToCloudinary } from "../../app/utils/sendImageTOCloudinary";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const productCreateIntoDB = async (file:any,product: IProduct)=>{
  if(file){
    const path = file?.path;

     //upload image
     const imageName = `${product.name}`;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    product.image = secure_url as string;
    const result = (await Product.create(product)).toObject();
    return result;
  }
}

// Get All Product 
const getAllProductFromDB = async (query:Record<string,unknown>) => {

  const getAllProductQuery = new QueryBuilder(
    Product.find(),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await getAllProductQuery.modelQuery;
  return result;
};

// Get Single Product
const getSingleProductFromDB = async(id:string) =>{
    const result = await Product.findById(id);
    if(result){
      return result
    }
    return false;
}

// Update Single Product
const updateProductIntoDB = async(id:string,data:IProduct)=>{

  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    return false;
  }

  const result = await Product.findByIdAndUpdate(id, data, { new: true });
  return result;
}

// Delete Single Product
const deleteProductFromDB = async(id:string) =>{
  
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    return false;
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