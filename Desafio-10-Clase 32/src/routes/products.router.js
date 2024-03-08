import { Router } from 'express';
import productController from '../controllers/products.controller.js'
import { verifyAdmin } from '../middlewares/verifyRole.js';

const router = Router();

router.get('/', verifyAdmin, productController.getAllCtr);

//router.get('/:id', productController.getById);

//ruta para probar un dto:
router.get('/dto/:id', productController.getProductByIdDto);

//ruta para probar un dto:
router.get('/dto/:id', productController.getProductByIdDto);

router.post('/', verifyAdmin, productController.create);

//crear los productos desde un file --->
//router.post('/file', controllerProducts.createFileProductCtr)

router.put('/:id', verifyAdmin, productController.update);

router.delete('/:id', verifyAdmin, productController.remove);

//router.post('/mockingproducts', productController.createProductsMocking)
router.get('/mockingproducts', productController.getProductsMocking)

export default router;