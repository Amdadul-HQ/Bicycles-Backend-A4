"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    product: { type: String, required: true, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
orderSchema.statics.isOrderExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existOrder = yield exports.Order.findById(id);
        return existOrder;
    });
};
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
