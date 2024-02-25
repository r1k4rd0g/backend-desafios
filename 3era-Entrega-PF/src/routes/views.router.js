import {Router} from 'express';
import productController from '../controllers/products.controller.js';
import sessionController from '../controllers/sessions.controller.js';
import userController from '../controllers/users.controller.js'
const router = Router();

//esta vista muestra los productos de lista, más el nombre de usuario y más:
router.get('/productlist', productController.getAllSimple);

router.get('/productlist', (req, res)=>{
    res.render('productlist')
})

router.get('/home', (req, res)=>{
    res.render('home');
});
router.get('/register', (req, res)=>{
    res.render('register');
})
router.get('/register-success', (req, res)=>{
    res.render('registersuccess')
})

router.get('/realtimeproducts', productController.getProductsRealTime);

router.post('/realtimeproducts',productController.createProductsRealTime);

router.get('/registererror', (req, res)=>{
    res.render('registererror')
})
router.get('/errorlogin', (req, res)=>{
    res.render('errorlogin')
})
router.get('/current', sessionController.profileResponse);

router.get('/profile', (req, res)=>{
    res.render('profile', {user: req.session.passport.user});
})



export default router;