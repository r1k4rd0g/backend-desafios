import {Router} from 'express';
const router = Router();
import fs from 'fs';
import { ProductManager } from '../managers/products.manager.js';
import { productValidator } from '../middlewares/productsValidator.js';
const productManager = new ProductManager('./data/products.json');
import socketServer from '../app.js';

async function loadProducts(){
    try {
        const productsData = await fs.promises.readFile('./data/products.json', 'utf-8');
        const productsJSON = JSON.parse(productsData);
        return productsJSON;
    } catch (error) {
        throw new Error (`Error al cargar los productos: ${error.message}`);
    }
}
const products = await loadProducts();

router.get('/home', async (req, res)=>{
    //console.log('consola 1:', products);
    res.render('home' , {products: products})
})

router.get('/realtimeproducts', async (req, res)=>{
    res.render('realTimeProducts', {products: products});
})

router.post('/realtimeproducts',async (req, res)=>{
    try {
        const {newProduct} = req.body
        console.log('console 2:', {newProduct});
        await productManager.addProduct(newProduct);
        socketServer.emit('products', await productManager.getProducts())
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error.message);
    }

})
router.delete('/realtimeproducts', async(req, res)=>{

})

export default router;