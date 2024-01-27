import {cartDao} from '../daos/mongodb/carts/carts.dao.js';
import {productDao} from '../daos/mongodb/products/products.dao.js';
import Services from './class.services.js';



class CartService extends Services{
    constructor(cartDao, productDao){
        super(cartDao);
        this.productDao = productDao
    }
    saveProductToCart = async (cid, pid, quantity) => {
        try {
            const productSearch = await this.productDao.getById(pid);
            //console.log('consola linea 36 cart services',productSearch)
            if (!productSearch) throw new Error('producto no encontrado');
            const cartUpdate = await this.dao.saveProductToCart(cid, pid, quantity);
            if (!cartUpdate) return false,
                //console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`);
            console.log('consola linea 41 cart services', cartUpdate)
            else return cartUpdate
        } catch (error) {
            console.log(`error al actualizar el producto de id: ${cid}, msg: ${error}, en carts.service`);
        }
    };

    removeCartById = async (cid) => {
        try {
            const cartRemove = await this.dao.delete(cid)
            if (!cartRemove) return false, console.log(`carrito con id: ${cid}, no encontrado`);
            else return cartRemove;
        } catch (error) {
            console.log(`error al eliminar el carrito con id ${cid}, msg ${error}, en carts.service`);
        }
    };

    removeProductById = async (cid, pid) => {
        try {
            const productSearch = await this.productDao.getById(pid);
            console.log('Producto buscado linea 60 cart service',productSearch)
            if (!productSearch) throw new Error('producto no encontrado');
            const cartUpdate = await this.dao.removeProductById(cid, pid);
            console.log('Linea 63 cart service cartUpdate',cartUpdate)
            if (!cartUpdate) return false,
                console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`);
            else return cartUpdate;
        } catch (error) {
            console.log(`error al actualizar el producto de id: ${cid}, msg: ${error}, en carts.service`);
        }
    }

    clearCart = async(cid)=>{
        try {
            const cartToClear = await this.dao.clearCart(cid);
            if(!cartToClear) return false, console.log(`Carrito con id:${cid}, no encontrado`)
            else return cartToClear
        } catch (error) {
            console.log(`error al vaciar el carrito de id :${cid}`);
        }
    }
}
const cartService = new CartService(cartDao, productDao);
export default cartService;

/*export const getById = async (cid) => {
    try {
        const cartSearch = await cartDao.getById(cid);
        if (!cartSearch) return false, console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`)
        else return cartSearch;
    } catch (error) {
        console.log(`error al crear el carrito con obj ${cid}, msg ${error}, en carts.service`);
    }
};*/
/*export const createCart = async (nameCart) => {
    try {
        const newCart = await cartDao.create(nameCart);
        console.log('consola de carts.services const create:', newCart);
        if (!newCart) return false, console.log('producto no creado');
        else return newCart
    } catch (error) {
        console.log(`error al crear el carrito con obj ${obj}, msg ${error}, en carts.service`);
    }
};*/
