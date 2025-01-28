import { z } from 'zod';
import { Role } from './user.constant';


const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is Required'),
    email: z
      .string()
      .email('Invalid Email Address')
      .min(1, 'User Email is Required'),
    password: z
      .string()
      .min(1, 'Password is Required'),
    role: z.enum([...Role] as [string, ...string[]]).default('customer').optional(),
    isBlocked:z.boolean().default(false).optional()
  }),
});


export const userValidation = {
    createUserValidationSchema
}