import { Router } from 'express';
import * as controllerProducts from '../controllers/products.controller.js'
import { productValidator } from '../middlewares/productsValidator.js';
const router = Router();

router.get('/', controllerProducts.getAll);

router.get('/:id', controllerProducts.getById);

router.post('/', productValidator, controllerProducts.create);

router.put('/:id', controllerProducts.update);

router.delete('/:id', controllerProducts.remove);

export default router;