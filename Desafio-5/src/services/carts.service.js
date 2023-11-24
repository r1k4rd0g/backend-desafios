import CartDaoMongoDB from '../daos/mongodb/carts.dao.js';
const cartDao = new CartDaoMongoDB();

export const getAll = async()=>{
    try {
        return await cartDao.getAll()
    } catch (error) {
        console.log('error al obtener todos los carritos en carts.service', error);
    }
}
export const getById = async(id)=>{
    try {
        const cartSearch = await cartDao.getById(id);
        if(cartSearch) return false, console.log(`carrito buscado en carts.service con id: ${id}, no encontrado`)
        else return cartSearch;
    } catch (error) {
        console.log(`error al crear el carrito con obj ${obj}, msg ${error}, en carts.service`);
    }
}
export const create = async(obj)=>{
    try {
        const newCart = await cartDao.create(obj);
        console.log('consola de carts.services const create:',newProd);
        if(!newCart) return false, console.log('producto no creado');
        else return newCart
    } catch (error) {
        console.log(`error al crear el carrito con obj ${obj}, msg ${error}, en carts.service`);
        }
    }

export const update = async(id, obj)=>{
    try {
        const cartUpdate = await cartDao.update(id, obj);
        if(!cartUpdate) return false, console.log(`carrito buscado en carts.service con id: ${id}, no encontrado`);
        else return cartUpdate;
    } catch (error) {
        console.log(`error al actualizar el producto de id: ${id}, con obj: ${obj} ,msg: ${error}, en carts.service`);
    }
}

export const remove = async(id)=>{
    try {
        const cartRemove = await cartDao.delete(id)
        if(!cartRemove) return false, console.log(`carrito con id: ${id}, no encontrado`);
        else return cartRemove;
    } catch (error) {
        console.log(`error al eliminar el carrito con id ${id}, msg ${error}, en carts.service`);
    }
}