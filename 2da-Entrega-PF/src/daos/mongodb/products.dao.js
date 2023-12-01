import {ProductModel} from './models/products.model.js';

export default class ProductDaoMongoDB{

    async getAllCtr(){
        try {
            return await ProductModel.find({});
        } catch (error) {
            console.log('error al obtener todos los productos', error);
            throw new Error ('error al obtener todos los productos', error)
        }
    }

    async getById(id){
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.log(`error al obtener el producto de id: ${id}, msg: ${error}`);
            throw new Error (`error al obtener el producto de id: ${id}, msg: ${error}`)
        }
    }

    async create(obj){
        try {
            return await ProductModel.create(obj);
        } catch(error) {
            console.log(`error al crear el producto con obj ${obj}, msg ${error}`);
            throw new Error (`error al crear el producto con obj ${obj}, msg ${error}`)
        }
    }

    async update(id, obj){
        try {
            return await ProductModel.findByIdAndUpdate({_id: id}, obj,
                {new: true},);
        } catch (error) {
            console.log(`error al actualizar el producto de id: ${id}, con obj: ${obj} ,msg: ${error}`);
            throw new Error (`error al actualizar el producto de id: ${id}, con obj: ${obj} ,msg: ${error}`)
        }
    }

    async delete(id){
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(`error al eliminar el producto con id ${id}, msg ${error}`);
            throw new Error (`error al eliminar el producto con id ${id}, msg ${error}`)
        }
    }
}
