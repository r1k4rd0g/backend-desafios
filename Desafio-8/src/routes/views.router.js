import {Router} from 'express';
import socketServer from '../app.js';
import * as controllerProducts from '../controllers/products.controller.js'
import * as controllerUsers from '../controllers/users.controller.js'
const router = Router();

//router.get('/productlist', controllerProducts.getAllSimple);

router.get('/home', (req, res)=>{
    res.render('home');
});
router.get('/register', (req, res)=>{
    res.render('register');
})
//router.get('/productlist', controllerUsers.register
router.get('/productlist', (req, res)=>{
    res.render('productlist')
})

router.get('/realtimeproducts', controllerProducts.getProductsRealTime);

router.post('/realtimeproducts',controllerProducts.createProductsRealTime);

router.get('/registererror', (req, res)=>{
    res.render('registererror')
})
router.get('/errorlogin', (req, res)=>{
    res.render('errorlogin')
})

export default router;