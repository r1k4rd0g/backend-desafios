import CartDaoMongoDB from '../daos/mongodb/carts.dao.js';
import ProductDaoMongoDB from '../daos/mongodb/products.dao.js';
const cartDao = new CartDaoMongoDB();
const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
    try {
        return await cartDao.getAll()
    } catch (error) {
        console.log('error al obtener todos los carritos en carts.service', error);
    }
};
export const getById = async (cid) => {
    try {
        const cartSearch = await cartDao.getById(cid);
        if (!cartSearch) return false, console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`)
        else return cartSearch;
    } catch (error) {
        console.log(`error al crear el carrito con obj ${cid}, msg ${error}, en carts.service`);
    }
};
export const createCart = async (nameCart) => {
    try {
        const newCart = await cartDao.create(nameCart);
        console.log('consola de carts.services const create:', newCart);
        if (!newCart) return false, console.log('producto no creado');
        else return newCart
    } catch (error) {
        console.log(`error al crear el carrito con obj ${obj}, msg ${error}, en carts.service`);
    }
};

export const saveProductToCart = async (cid, pid, quantity) => {
    try {
        const productSearch = await productDao.getById(pid);
        //console.log('consola linea 36 cart services',productSearch)
        if (!productSearch) throw new Error('producto no encontrado');
        const cartUpdate = await cartDao.saveProductToCart(cid, pid, quantity);
        if (!cartUpdate) return false,
            //console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`);
        console.log('consola linea 41 cart services', cartUpdate)
        else return cartUpdate
    } catch (error) {
        console.log(`error al actualizar el producto de id: ${cid}, msg: ${error}, en carts.service`);
    }
};

export const removeCartById = async (cid) => {
    try {
        const cartRemove = await cartDao.delete(cid)
        if (!cartRemove) return false, console.log(`carrito con id: ${cid}, no encontrado`);
        else return cartRemove;
    } catch (error) {
        console.log(`error al eliminar el carrito con id ${cid}, msg ${error}, en carts.service`);
    }
};
export const removeProductById = async (cid, pid) => {
    try {
        const productSearch = await productDao.getById(pid);
        console.log('Producto buscado linea 60 cart service',productSearch)
        if (!productSearch) throw new Error('producto no encontrado');
        const cartUpdate = await cartDao.removeProductById(cid, pid);
        console.log('Linea 63 cart service cartUpdate',cartUpdate)
        if (!cartUpdate) return false,
            console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`);
        else return cartUpdate;
    } catch (error) {
        console.log(`error al actualizar el producto de id: ${cid}, msg: ${error}, en carts.service`);
    }
}

export const clearCart = async(cid)=>{
    try {
        const cartToClear = await cartDao.clearCart(cid);
        if(!cartToClear) return false, console.log(`Carrito con id:${cid}, no encontrado`)
        else return cartToClear
    } catch (error) {
        console.log(`error al vaciar el carrito de id :${cid}`);
    }
}