import {Schema, model} from 'mongoose';

export const productCollection = 'product';

export const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code:{type :String, require: true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: {type: String, require: true},
    thumbnail:{type: String}
});

export const ProductModel = model (
    productCollection,
    productSchema
);
