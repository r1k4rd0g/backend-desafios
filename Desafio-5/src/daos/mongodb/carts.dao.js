import {CartModel} from './models/carts.model.js';
import { ProductModel } from './models/product.model.js';

export default class CartDaoMongoDB{

    async getAll(){
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log('error al obtener todos los carts', error);
        }
    }
    async getById(id){
        try {
            return await CartModel.findById(id)
        } catch{
            console.log(`error al obtener el producto de id: ${id}, msg: ${error}`);
        }
    }
    async create(obj){
        try {
            return await ProductModel.create(obj);
        } catch (error) {
            console.log(`error al crear el producto con obj ${obj}, msg ${error}`);
        }
    }

}