import { Router } from 'express';
import productController from '../controllers/products.controller.js'

const router = Router();

router.get('/', productController.getAllCtr);

router.get('/:id', productController.getById);

router.post('/', productController.create);

//crear los productos desde un file --->
//router.post('/file', controllerProducts.createFileProductCtr)

router.put('/:id', productController.update);

router.delete('/:id', productController.remove);

export default router;