"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productZodUpdateSchema = exports.productZodSchema = void 0;
const zod_1 = require("zod");
// Zod Schema for Product
exports.productZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        image: zod_1.z.string().optional(),
        brand: zod_1.z.string().min(1, 'Brand is required'),
        price: zod_1.z.number().positive('Price must be positive'),
        category: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']),
        description: zod_1.z.string().min(1, 'Description is required'),
        quantity: zod_1.z.number().int().min(1, 'Quantity must be a non-negative integer'),
        inStock: zod_1.z.boolean(),
        isDeleted: zod_1.z.boolean().default(false)
    })
});
exports.productZodUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        price: zod_1.z.number().positive('Price must be positive').optional(),
        category: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']).optional(),
        description: zod_1.z.string().optional(),
        quantity: zod_1.z.number().int().min(1, 'Quantity must be a non-negative integer').optional(),
        inStock: zod_1.z.boolean().optional(),
    })
});
