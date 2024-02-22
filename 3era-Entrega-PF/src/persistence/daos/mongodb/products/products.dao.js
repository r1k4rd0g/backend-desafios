import {ProductModel} from './products.model.js';
import MongoDao from '../mongo.dao.js';

export default class ProductMongoDao extends MongoDao{
    constructor(){
        super(ProductModel);
    };

    async getAllPaginate(pageNumber, pageSize, filter, sortOptions){
        const options = {
            page : pageNumber,
            limit: pageSize,
            sort: sortOptions,
            /*customLabels: {
                totalDocs: 'totalProducts',
                docs: 'products'
            }*/
        }
        try {
            const response = await ProductModel.paginate(filter, options);
            return response;
        } catch (error) {
            console.log('error al obtener todos los productos', error);
            throw new Error ('error al obtener todos los productos', error)
        }
    };
    async getAllSimple() {
        try {
            return await ProductModel.find({});
        } catch (error) {
            console.log('error al obtener todos los productos', error);
            throw new Error('error al obtener todos los productos', error);
        }
    }
}
/*async getById(pid){
    try {
        return await ProductModel.findById(pid);
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

async update(pid, obj){
    try {
        return await ProductModel.findByIdAndUpdate({_id: pid}, obj,
            {new: true},);
    } catch (error) {
        console.log(`error al actualizar el producto de id: ${pid}, con obj: ${obj} ,msg: ${error}`);
        throw new Error (`error al actualizar el producto de id: ${pid}, con obj: ${obj} ,msg: ${error}`)
    }
}*/

    /*async delete(pid){
        try {
            return await ProductModel.findByIdAndDelete(pid);
        } catch (error) {
            console.log(`error al eliminar el producto con id ${pid}, msg ${error}`);
            throw new Error (`error al eliminar el producto con id ${pid}, msg ${error}`)
        }
    }*/

