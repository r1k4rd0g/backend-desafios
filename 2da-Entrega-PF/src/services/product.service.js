import ProductDaoMongoDB from '../daos/mongodb/products.dao.js';
import fs from 'fs';
import { __dirname } from '../utils.js';


const productDao = new ProductDaoMongoDB();
const productsFile = JSON.parse(
    fs.readFileSync(`${__dirname}/daos/filesystem/data/products.json`, 'utf-8')
);

// crea los productos desde el archivo .json:
export const createFileProduct = async ()=>{
    try {
        const createdProducts = [];
        for (const product of productsFile){
            const newProduct = await productDao.create(product)
            createdProducts.push(newProduct);
        }
        return {message: "productos del archivo cargados"}
        createdProducts: createdProducts
    } catch (error) {
        throw new Error (error)
    }
}



export const getAll = async(pageNumber = 1, pageSize = 10, searchQuery = '', sortOrder= '')=>{
    try {
        //validación de pageNumber y pageSize y seteo default por si no es válido
        if(isNaN(pageNumber) || pageNumber <1 ){
            pageNumber = 1;
        }
        if(isNaN(pageSize)|| pageSize<1 ){
            pageSize = 10;
        }
        const product = await productDao.getAll(pageNumber, pageSize);
        return product
    } catch (error) {
        console.log('error al obtener todos los productos en products.service', error);
        throw new Error ('error al obtener los productos')
    }
}

export const getById = async(id)=>{
    try {
        const prodSearch = await productDao.getById(id);
        if(!prodSearch) return false, console.log(`producto buscado en products.service con id: ${id}, no encontrado`)
        else return prodSearch;
    } catch (error) {
        console.log(`error al crear el producto con obj ${obj}, msg ${error}, en products.service`);
    }
}
export const create = async(obj)=>{
    try {
        const prodNew = await productDao.create(obj);
        console.log('consola de products.services const create:',prodNew);
        if(!prodNew) return false, console.log('producto no creado');
        else return prodNew
    } catch (error) {
        console.log(`error al crear el producto con obj ${obj}, msg ${error}, en products.service`);
        }
    }

export const update = async(id, obj)=>{
    try {
        const prodUpdate = await productDao.update(id, obj);
        if(!prodUpdate) return false, console.log(`producto buscado en products.service con id: ${id}, no encontrado`);
        else return prodUpdate;
    } catch (error) {
        console.log(`error al actualizar el producto de id: ${id}, con obj: ${obj} ,msg: ${error}, en products.service`);
    }
}

export const remove = async(id)=>{
    try {
        const prodRemove = await productDao.delete(id)
        if(!prodRemove) return false, console.log(`producto con id: ${id}, no encontrado`);
        else return prodRemove;
    } catch (error) {
        console.log(`error al eliminar el producto con id ${id}, msg ${error}, en products.service`);
    }
}