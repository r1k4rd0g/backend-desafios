import {CartModel} from './models/carts.model.js';
//import { ProductModel } from './models/product.model.js';

export default class CartDaoMongoDB{

    async getAll(){
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log('error al obtener todos los carts', error);
            throw new Error ('error al obtener todos los carts', error);
        }
    }
    async getById(id){
        try {
            return await CartModel.findById(id)
        } catch{
            console.log(`error al obtener el carrito de id: ${id}, msg: ${error}`);
            throw new Error (`error al obtener el carrito de id: ${id}, msg: ${error}`);
        }
    }
    async create(obj){
        try {
            return await CartModel.create(obj);
        } catch (error) {
            console.log(`error al crear el carrito con obj ${obj}, msg ${error}`);
            throw new Error(`error al crear el carrito con obj ${obj}, msg ${error}`);
        }
    }
    async update(id, obj){
        try {
            return await CartModel.findByIdAndUpdate({_id: id}, obj,
                {new: true},);
        } catch (error) {
            console.log(`error al actualizar el carrito de id: ${id}, con obj: ${obj} ,msg: ${error}`);
            throw new Error(`error al actualizar el carrito de id: ${id}, con obj: ${obj} ,msg: ${error}`);
        }
    }

    async delete(id){
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(`error al eliminar el carrito con id ${id}, msg ${error}`);
            throw new Error(`error al eliminar el carrito con id ${id}, msg ${error}`);
        }
    };
}
