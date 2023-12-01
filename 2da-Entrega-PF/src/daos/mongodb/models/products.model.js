import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//nombre de la colección de productos:
export const productCollection = 'product';

//requerimientos para crear un producto:
export const productSchema = new Schema({
    Title: {
        type: String,
        required: true,
        index: true
    },
    Description: {
        type: String,
        required: true
    },
    Code:{
        type :String,
        require: true,
        unique: true,
        index: true
    },
    Price: {
        type: Number,
        required: true}
        ,
    Stock: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        require: true
    },
    Thumbnail:{
        type: [String] //array de strings
    }
});
//ejecutamos mongoose paginate:
productSchema.plugin(mongoosePaginate);

//exportamos el modelo como ProductModel
export const ProductModel = model (
    productCollection,
    productSchema
);

