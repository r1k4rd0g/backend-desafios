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
            return await CartModel.findById(cid).populate('product')
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
    async saveProductToCart(cid, pid){
        try {
            const cartID = await CartModel.findById(cid).populate('product');
            if(!cartID) throw new error ('no existe el carrito');
            cartID.product.push(pid);
            cartID.save();
            return cartID
            //return await CartModel.findByIdAndUpdate();
        } catch (error) {
            console.log(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
            throw new Error(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
        }
    }

    async delete(cid){
        try {
            const cartDelete = await CartModel.findByIdAndDelete(cid);
            //console.log('consola dao', cid)
            return cartDelete
        } catch (error) {
            console.log(`error al eliminar el carrito con id ${cid}, msg ${error}`);
            throw new Error(`error al eliminar el carrito con id ${cid}, msg ${error}`);
        }
    };

    async removeProductById(cid, pid){
        try {
            const cartID = await CartModel.findById(cid).populate('product');
            if(!cartID) throw new error ('no existe el carrito');
            cartID.product.pull(pid);
            await cartID.save();
            return cartID
            //return await CartModel.findByIdAndUpdate();
        } catch (error) {
            console.log(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
            throw new Error(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
        }
    }
}
