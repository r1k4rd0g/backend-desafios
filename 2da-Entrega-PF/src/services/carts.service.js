import CartDaoMongoDB from '../daos/mongodb/carts.dao.js';
const cartDao = new CartDaoMongoDB();

export const getAll = async()=>{
    try {
        return await cartDao.getAll()
    } catch (error) {
        console.log('error al obtener todos los carritos en carts.service', error);
    }
}
export const getById = async(cid)=>{
    try {
        const cartSearch = await cartDao.getById(cid);
        if(cartSearch) return false, console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`)
        else return cartSearch;
    } catch (error) {
        console.log(`error al crear el carrito con obj ${cid}, msg ${error}, en carts.service`);
    }
}
export const createCart = async(nameCart)=>{
    try {
        const newCart = await cartDao.create(nameCart);
        console.log('consola de carts.services const create:',newCart);
        if(!newCart) return false, console.log('producto no creado');
        else return newCart
    } catch (error) {
        console.log(`error al crear el carrito con obj ${obj}, msg ${error}, en carts.service`);
        }
    }

export const update = async(cid, obj)=>{
    try {
        const cartUpdate = await cartDao.update(cid, obj);
        if(!cartUpdate) return false, console.log(`carrito buscado en carts.service con id: ${id}, no encontrado`);
        else return cartUpdate;
    } catch (error) {
        console.log(`error al actualizar el producto de id: ${id}, con obj: ${obj} ,msg: ${error}, en carts.service`);
    }
}

export const removeCartById = async(cid)=>{
    try {
        const cartRemove = await cartDao.delete(cid)
        if(!cartRemove) return false, console.log(`carrito con id: ${cid}, no encontrado`);
        else return cartRemove;
    } catch (error) {
        console.log(`error al eliminar el carrito con id ${cid}, msg ${error}, en carts.service`);
    }
}