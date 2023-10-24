import express from 'express';
import { ProductManager } from './manager/products.manager.js';
const productManager = new ProductManager('./products.json');

const app = express();
app.use(express.json());

app.get('/products', async(req, res)=>{
    try {
        const products = await productManager.getProducts();
        const {limit} = req.query;
        const filterProducts = products.filter((product, index)=>index < parseInt(limit));
        if(!limit || isNaN(parseInt(limit))|| parseInt(limit) <=0){
            res.status(200).json(products);
        } else {
            res.status(200).json(filterProducts);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.get('/products/:pid', async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json(error.message);
    }
})
const PORT = 8088;

app.listen(PORT, ()=> console.log(`Server ok en el puerto ${PORT}`));
