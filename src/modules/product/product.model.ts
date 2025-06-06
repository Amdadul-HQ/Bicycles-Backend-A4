import { model, Schema } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    image:{ type:String,required:true,trim:true},
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true, 
    },
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true },
);


productSchema.statics.isProductExists = async function (
  id: string,
) {
  const existProduct = await Product.findById({ _id: id, isDeleted: false });
  return existProduct;
};

export const Product = model<IProduct,IProductModel>('Product',productSchema)