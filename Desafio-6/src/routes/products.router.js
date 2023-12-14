import { Router } from 'express';
import * as controllerProducts from '../controllers/products.controller.js'

const router = Router();

router.get('/', controllerProducts.getAllCtr);

router.get('/:id', controllerProducts.getById);

router.post('/', controllerProducts.create);

//crear los productos desde un file --->
//router.post('/file', controllerProducts.createFileProductCtr)

router.put('/:id', controllerProducts.update);

router.delete('/:id', controllerProducts.remove);

export default router;