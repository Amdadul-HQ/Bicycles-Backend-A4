"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, 'Name is Required'),
        email: zod_1.z
            .string()
            .email('Invalid Email Address')
            .min(1, 'User Email is Required'),
        password: zod_1.z
            .string()
            .min(1, 'Password is Required'),
        role: zod_1.z.enum([...user_constant_1.Role]).default('customer').optional(),
        isBlocked: zod_1.z.boolean().default(false).optional()
    }),
});
exports.userValidation = {
    createUserValidationSchema
};
