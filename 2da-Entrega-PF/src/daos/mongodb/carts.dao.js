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
    async getById(cid){
        try {
            return await CartModel.findById(cid)
        } catch{
            console.log(`error al obtener el carrito de id: ${cid}, msg: ${error}`);
            throw new Error (`error al obtener el carrito de id: ${cid}, msg: ${error}`);
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
    async update(cid, obj){
        try {
            return await CartModel.findByIdAndUpdate({_id: cid}, obj,
                {new: true},);
        } catch (error) {
            console.log(`error al actualizar el carrito de id: ${cid}, con obj: ${obj} ,msg: ${error}`);
            throw new Error(`error al actualizar el carrito de id: ${cid}, con obj: ${obj} ,msg: ${error}`);
        }
    }

    async delete(cid){
        try {
            console.log('consola dao', cid)
            return await CartModel.findByIdAndDelete(cid);
        } catch (error) {
            console.log(`error al eliminar el carrito con id ${cid}, msg ${error}`);
            throw new Error(`error al eliminar el carrito con id ${cid}, msg ${error}`);
        }
    };
}
