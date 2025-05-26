import { z } from "zod";

const createStoreValidationSchema = z.object({
  body: z.object({
    shopName: z
      .string({
        required_error: "Shop name is required",
      })
      .min(3, "Shop name must be at least 3 characters"),

    shopAddress: z
      .string({
        required_error: "Shop address is required",
      })
      .min(5, "Shop address must be at least 5 characters"),

    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number format"),
  }),
});

const updateStoreValidationScham = z.object({
  body:z.object({
    shopName: z
      .string()
      .min(3, "Shop name must be at least 3 characters").optional(),

    shopAddress: z
      .string()
      .min(5, "Shop address must be at least 5 characters").optional(),

    phone: z
      .string()
      .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number format").optional(),
  })
})


export const StoreValidationSchema = {
    createStoreValidationSchema,
    updateStoreValidationScham
}