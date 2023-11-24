import ProductDaoMongoDB from '../daos/mongodb/products.dao.js';
const productDao = new ProductDaoMongoDB();

export const getAll = async()=>{
    try {
        return await productDao.getAll()
    } catch (error) {
        console.log('error al obtener todos los productos en products.service', error);
    }
}

export const getById = async(id)=>{
    try {
        const prodSearch = await productDao.getById(id);
        if(prodSearch) return false, console.log(`producto buscado en products.service con id: ${id}, no encontrado`)
        else return prodSearch;
    } catch (error) {
        console.log(`error al crear el producto con obj ${obj}, msg ${error}, en products.service`);
    }
}
export const create = async(obj)=>{
    try {
        const prodNew = await productDao.create(obj);
        console.log('consola de products.services const create:',newProd);
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