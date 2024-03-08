import persistence from '../persistence/daos/factory.js';
import logger from '../utils/logger/logger.winston.js'
import Services from './class.services.js';
import { errorsDictionary } from '../utils/errors.dictionary.js';


class CartService extends Services{
    constructor(){
        super(persistence.cartDao);
        this.productDao = persistence.productDao
    }
    saveProductToCart = async (cid, pid, quantity) => {
        try {
            //console.log(`que llega del controller en service? cid ${cid}, pid ${pid}, quantity ${quantity}`)
            const productSearch = await this.productDao.getById(pid);
            //console.log('consola linea 36 cart services',productSearch)
            //console.log('cid que llega al cartsService', cid)
            if (!productSearch) throw new Error(errorsDictionary.ERROR_TO_FIND);
            const cartUpdate = await this.dao.saveProductToCart(cid, pid, quantity);
            if (!cartUpdate) return false;
                //console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`);
                //console.log('consola linea 41 cart services', cartUpdate)
            else return cartUpdate
        } catch (error) {
            logger.error('entró en el catch - carts.service - saveProductToCart: ' + error)
            throw new Error (error.message, errorsDictionary.ERROR_ADD_TO_CART);
        }
    };

    removeCartById = async (cid) => {
        try {
            const cartRemove = await this.dao.delete(cid)
            if (!cartRemove) return false;
            //console.log(`carrito con id: ${cid}, no encontrado`);
            else return cartRemove;
        } catch (error) {
            logger.error('entró en el catch - carts.service - removeCartById: ' + error)
            throw new Error (error.message, errorsDictionary.ERROR_TO_REMOVE);
        }
    };

    removeProductById = async (cid, pid) => {
        try {
            const productSearch = await this.productDao.getById(pid);
            //console.log('Producto buscado linea 60 cart service',productSearch)
            if (!productSearch) throw new Error(errorsDictionary.ERROR_TO_FIND);
            const cartUpdate = await this.dao.removeProductById(cid, pid);
            //console.log('Linea 63 cart service cartUpdate',cartUpdate)
            if (!cartUpdate) return false;
                //console.log(`carrito buscado en carts.service con id: ${cid}, no encontrado`);
            else return cartUpdate;
        } catch (error) {
            logger.error('entró en el catch - carts.service - removeProductById: ' + error)
            throw new Error (error.message, errorsDictionary.ERROR_TO_REMOVE);
        }
    }

    clearCart = async(cid)=>{
        try {
            const cartToClear = await this.dao.clearCart(cid);
            if(!cartToClear) return false;
            //console.log(`Carrito con id:${cid}, no encontrado`)
            else return cartToClear
        } catch (error) {
            logger.error('entró en el catch - carts.service - clearCart: ' + error)
            throw new Error (error.message, errorsDictionary.ERROR_DEFAULT);
        }
    }
}
const cartService = new CartService();
export default cartService;
