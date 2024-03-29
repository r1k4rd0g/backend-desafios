import { Router } from 'express';
import cartController from '../controllers/carts.controller.js';

const router = Router();

//import {CartsDaoFS} from '../daos/filesystem/carts.dao.js';
//const cartsDaoFS = new CartsDaoFS('../daos/filesystem/data/carts.json');

//obtiene todos los carritos existentes:
router.get('/', cartController.getAll);

//obtiene el carrito por id seleccionado:
router.get('/:cid', cartController.getById);

//crea un carrito:
router.post('/', cartController.create);

router.post('/:cid/product/:pid', cartController.saveProductToCart);

//elimina el carrito por id seleccionado.
router.delete('/:cid', cartController.removeCartById);

//router.put('/:cid',cartController.updateCart); //actualizar el carrito con los productos que existen
//router.put('/:cid/products/:pid', cartController.updateAll)
router.delete('/:cid/product/:pid', cartController.removeProductById);

//vacía el carrito:
router.delete('/clear/:cid', cartController.clearCart)


export default router;