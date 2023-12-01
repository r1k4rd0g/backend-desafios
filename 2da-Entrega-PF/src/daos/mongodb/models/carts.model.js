import { Schema, model } from "mongoose";
import { ProductModel } from "./product.model.js";
import mongoosePaginate from 'mongoose-paginate-v2;'

export const cartCollection = 'cart';
export const cartSchema = new Schema({
    product: [
        {
        type: Schema.Types.ObjectId,
        ref: ProductModel,
        default: []
        }
    ]
})

cartSchema.plugin(mongoosePaginate);

export const CartModel = model (
    cartCollection,
    cartSchema
);
