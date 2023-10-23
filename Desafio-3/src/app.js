import express from 'express';
import { ProductManager } from './manager/products.manager.js';
const productManager = new ProductManager();

const app = express();
app.use(express.json());

app.get('/products', async(req, res)=>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        
    }
})
console.log('todo bn hasta ahora');