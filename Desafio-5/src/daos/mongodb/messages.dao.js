import {MsgModel} from './models/messages.model.js';

export default class MsgDaoMongoDB{

    async getAll(){
        try {
            return await MsgModel.find({});
        } catch (error) {
            console.log('error al obtener todos los carts', error);
            throw new Error('error al obtener todos los carts', error);
        }
    }
    async getById(id){
        try {
            return await MsgModel.findById(id)
        } catch{
            console.log(`error al obtener el carrito de id: ${id}, msg: ${error}`);
            throw new Error(`error al obtener el carrito de id: ${id}, msg: ${error}`);
        }
    }
    async create(obj){
        try {
            return await MsgModel.create(obj);
        } catch (error) {
            console.log(`error al crear el carrito con obj ${obj}, msg ${error}`);
            throw new Error(`error al crear el carrito con obj ${obj}, msg ${error}`);
        }
    }
    async update(id, obj){
        try {
            return await MsgModel.findByIdAndUpdate({_id: id}, obj,
                {new: true},);
        } catch (error) {
            console.log(`error al actualizar el carrito de id: ${id}, con obj: ${obj} ,msg: ${error}`);
            throw new Error(`error al actualizar el carrito de id: ${id}, con obj: ${obj} ,msg: ${error}`);
        }
    }

    async delete(id){
        try {
            return await MsgModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(`error al eliminar el carrito con id ${id}, msg ${error}`);
            throw new Error(`error al eliminar el carrito con id ${id}, msg ${error}`);
        }
    };

    async deleteAll(){
        try {
            return await MsgModel.deleteMany({});
        } catch (error) {
            console.log('error al obtener todos los carts', error);
            throw new Error('error al obtener todos los carts', error);
        }
    }
}
