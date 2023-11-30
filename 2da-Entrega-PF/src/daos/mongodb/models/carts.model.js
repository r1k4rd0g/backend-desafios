import { Schema, model } from "mongoose";
import { ProductModel } from "./product.model.js";

export const cartCollection = 'cart';
export const cartSchema = new Schema({
    product: [{
        type: Schema.Types.ObjectId,
        ref: ProductModel
    }]
})

export const CartModel = model (
    cartCollection,
    cartSchema
);
