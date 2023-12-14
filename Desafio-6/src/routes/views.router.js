import {Router} from 'express';
import socketServer from '../app.js';
import * as controllerProducts from '../controllers/products.controller.js'
const router = Router();

router.get('/home', controllerProducts.getAllSimple)

router.get('/realtimeproducts', controllerProducts.getProductsRealTime)

router.post('/realtimeproducts',controllerProducts.createProductsRealTime)


export default router;