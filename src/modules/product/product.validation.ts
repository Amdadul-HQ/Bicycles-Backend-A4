import { z } from 'zod';


const BicycleCategoryEnum = z.enum([
  "Mountain",
  "Road",
  "Hybrid",
  "Gravel",
  "Electric",
  "Cruiser",
  "BMX",
  "Folding",
  "City",
  "Touring",
  "Fat Tire",
  "Fixie",
]);
// Zod Schema for Product
export const productZodSchema = z.object({
  body:z.object({
  name: z.string().min(1, 'Name is required'),
  image:z.string().optional(),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().positive('Price must be positive'),
  category: BicycleCategoryEnum,
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().int().min(1, 'Quantity must be a non-negative integer'),
  inStock: z.boolean(),
  isDeleted:z.boolean().default(false)
  })
});

export const productZodUpdateSchema = z.object({
  body:z.object({
  name: z.string().optional(),
  image:z.string().optional(),
  brand: z.string().optional(),
  price: z.number().positive('Price must be positive').optional(),
  category: BicycleCategoryEnum.optional(),
  description: z.string().optional(),
  quantity: z.number().int().min(1, 'Quantity must be a non-negative integer').optional(),
  inStock: z.boolean().optional(),
  })
})
