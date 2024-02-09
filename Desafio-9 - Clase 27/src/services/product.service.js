//importamos los Crud de servicios o las funciones básicas de servicios:
import Services from './class.services.js';
//importamos el modelo ProductDao con las nuevas :
import productDao from '../persistence/persistence.js'
import fs from 'fs';
import { __dirname } from '../utils.js';
//inicializamos:


class ProductService extends Services{
    constructor(){
        super(productDao)
    }

    getAllPaginate = async (
        pageNumber = 1,
        pageSize = 10,
        searchQuery = '',
        sortOrder = {},
        category,
        exist,
        priceFilter
    ) => {
        try {
            //validación de pageNumber y pageSize y seteo default por si no es válido
            if (isNaN(pageNumber) || pageNumber < 1) {
                pageNumber = 1;
            }
            if (isNaN(pageSize) || pageSize < 1) {
                pageSize = 10;
            }
            const buildFilter = (searchQuery, priceFilter, category, exist) => {
                let filter = {};
                if (typeof priceFilter === 'number'){
                    filter ['Price']= priceFilter;
                } else {
                    if (searchQuery !== '') {
                        filter['$or'] = [
                            { 'Title': { $regex: searchQuery, $options: 'i' } },
                            { 'Description': { $regex: searchQuery, $options: 'i' } },
                            { 'Code': { $regex: searchQuery, $options: 'i' } },
                            { 'Category': { $regex: searchQuery, $options: 'i' } }
                        ];
                    }
                }
                if(category){
                    filter['Category'] = {$regex:category, $options : 'i'};
                }
                if(exist){
                    if(exist ==='yes'){filter['Stock']={$gt:0};
                    } else if(exist ==='no'){ filter['Stock'] = {$lte:0}}
                }
                return filter;
            };
            const buildSortOptions = (sortOrder) => {
                let sortOptions = {};
                if (sortOrder === 'asc' || sortOrder === 'desc') {
                    sortOptions['Price'] = sortOrder === 'asc' ? 1 : -1;
                    console.log('sortOptions:', sortOptions)
                }
                return sortOptions;
            };
            const filter = buildFilter(searchQuery, priceFilter, category, exist);
            console.log('consola 4:', filter)
            const sortOptions = buildSortOptions(sortOrder);
            console.log('consola 5', sortOptions)
            const product = await productDao.getAllPaginate(pageNumber, pageSize, filter, sortOptions);
            return product
        } catch (error) {
            console.log('error al obtener todos los productos en products.service', error);
            throw new Error('error al obtener los productos')
        }
    };
    getAllSimple = async () => {
        try {
            const products = await productDao.getAllSimple()
            return products;
        } catch (error) {
            console.log('error al obtener todos los productos en product.service', error);
        }
    };
}

const productService = new ProductService(productDao);
export default productService;

/*const productsFile = JSON.parse(
    fs.readFileSync(`${__dirname}/daos/filesystem/data/products.json`, 'utf-8')
);

// crea los productos desde el archivo .json:
export const createFileProduct = async () => {
    try {
        const createdProducts = [];
        for (const product of productsFile) {
            const newProduct = await productDao.create(product)
            createdProducts.push(newProduct);
        }
        return { message: "productos del archivo cargados" }
    } catch (error) {
        throw new Error(error)
    }
}*/



/*export const getById = async (pid) => {
    try {
        const prodSearch = await productDao.getById(id);
        if (!prodSearch) return false, console.log(`producto buscado en products.service con id: ${pid}, no encontrado`)
        else return prodSearch;
    } catch (error) {
        console.log(`error al crear el producto con obj ${obj}, msg ${error}, en products.service`);
    }
}*/
/*export const create = async (obj) => {
    try {
        const prodNew = await productDao.create(obj);
        console.log('consola de products.services const create:', prodNew);
        if (!prodNew) return false, console.log('producto no creado');
        else return prodNew
    } catch (error) {
        console.log(`error al crear el producto con obj ${obj}, msg ${error}, en products.service`);
    }
}*/

/*export const update = async (pid, obj) => {
    try {
        const prodUpdate = await productDao.update(pid, obj);
        if (!prodUpdate) return false, console.log(`producto buscado en products.service con id: ${pid}, no encontrado`);
        else return prodUpdate;
    } catch (error) {
        console.log(`error al actualizar el producto de id: ${pid}, con obj: ${obj} ,msg: ${error}, en products.service`);
    }
}*/

/*remove = async (pid) => {
    try {
        const prodRemove = await this.dao.delete(pid)
        if (!prodRemove) return false, console.log(`producto con id: ${pid}, no encontrado`);
        else return prodRemove;
    } catch (error) {
        console.log(`error al eliminar el producto con id ${pid}, msg ${error}, en products.service`);
    }
}*/