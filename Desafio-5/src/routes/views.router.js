import {Router} from 'express';
const router = Router();
import fs from 'fs';
import { ProductDaoFS } from '../daos/filesystem/products.dao.js';
import { productValidator } from '../middlewares/productsValidator.js';
const productDaoFS = new ProductDaoFS('../daos/filesystem/data/products.json');
import socketServer from '../app.js';

async function loadProducts(){
    try {
        const productsData = await fs.promises.readFile('../daos/filesystem/data/products.json', 'utf-8');
        const productsJSON = JSON.parse(productsData);
        return productsJSON;
    } catch (error) {
        throw new Error (`Error al cargar los productos: ${error.message}`);
    }
}

router.get('/home', async (req, res)=>{
    //console.log('consola 1:', products);
    const products = await loadProducts();
    res.render('home' , {products: products}) // este product viene de linea 18, cargado desde el json, por medio de la funcion loadProducts. Este es hundlebars.
})

router.get('/realtimeproducts', async (req, res)=>{
    const products = await loadProducts();
    res.render('realtimeproducts', {products: products});
})

router.post('/realtimeproducts',async (req, res)=>{
    try {
        //console.log(' consola 2 req.body:', req.body);
        const {title, description, code, price, stock, category} = req.body;
       // console.log('console 3:', title, description, code, price, stock, category);
        const newProduct = {title, description, code, price, stock, category}
        await productDaoFS.addProduct(newProduct);
        const products = await productDaoFS.getProducts()
        console.log("consola 4 products:", products);
        socketServer.emit('products', products);
        //res.render('realTimeProducts', {products: products})
    } catch (error) {
        res.status(500).json(error.message);
    }

})

export default router;