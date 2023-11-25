import { Router } from 'express';
import * as controllerProducts from '../controllers/products.controller.js'
import { productValidator } from '../middlewares/productsValidator.js';
const router = Router();

router.get('/product', controllerProducts.getAll);

router.get('/product:id', controllerProducts.getById);

router.post('/product', productValidator, controllerProducts.create);

router.put('/product:id', controllerProducts.update);

router.delete('/product:id', controllerProducts.remove);

export default router;