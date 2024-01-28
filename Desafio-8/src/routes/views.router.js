import {Router} from 'express';
import productController from '../controllers/products.controller.js';
import * as controllerProducts from '../controllers/products.controller.js'
import * as controllerUsers from '../controllers/users.controller.js'
const router = Router();

router.get('/productlist', productController.getAllSimple);

router.get('/home', (req, res)=>{
    res.render('home');
});
router.get('/register', (req, res)=>{
    res.render('register');
})
router.get('/register-success', (req, res)=>{
    res.render('registersuccess')
})
//router.get('/productlist', controllerUsers.register
router.get('/productlist', (req, res)=>{
    res.render('productlist')
})

router.get('/realtimeproducts', productController.getProductsRealTime);

router.post('/realtimeproducts',productController.createProductsRealTime);

router.get('/registererror', (req, res)=>{
    res.render('registererror')
})
router.get('/errorlogin', (req, res)=>{
    res.render('errorlogin')
})

export default router;