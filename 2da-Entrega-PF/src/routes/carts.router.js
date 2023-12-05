import { Router } from 'express';
import * as controllerCarts from '../controllers/carts.controller.js'
const router = Router();

//import {CartsDaoFS} from '../daos/filesystem/carts.dao.js';
//const cartsDaoFS = new CartsDaoFS('../daos/filesystem/data/carts.json');

//obtiene todos los carritos existentes:
router.get('/', controllerCarts.getAll);

//obtiene el carrito por id seleccionado:
router.get('/:cid', controllerCarts.getCartById);

//crea un carrito:
router.post('/', controllerCarts.createCart);

router.post('/:cid/product/:pid', controllerCarts.saveProductToCart);

//elimina el carrito por id seleccionado.
router.delete('/:cid', controllerCarts.removeCartById);

//router.put('/:cid',controllerCarts.updateCart); //actualizar el carrito con los productos que existen
//router.put('/:cid/products/:pid', controllerCarts.updateAll)
//router.delete('/:cid/products/:pid', controllerCarts.remove);
//router.delete('/:cid', controllerCarts.removeAll)


export default router;