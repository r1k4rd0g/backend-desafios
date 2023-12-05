import { Schema, model } from "mongoose";
import {ProductModel} from "../models/products.model.js";
import mongoosePaginate from 'mongoose-paginate-v2';

export const cartCollection = 'cart';

export const cartSchema = new Schema({
    name: {type: String, required: true, unique: true},
    product: [
        {
        type: Schema.Types.ObjectId,
        ref: 'product',
        default: []
        }
    ]
})
cartSchema.pre ('find', function (){
    this.populate('product')
})
cartSchema.plugin(mongoosePaginate);

export const CartModel = model (
    cartCollection,
    cartSchema
);
