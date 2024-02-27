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

