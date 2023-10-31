import { Router } from 'express';
const router = Router();

import { ProductManager } from '../managers/products.manager.js';
const productManager = new ProductManager('./data/products.json');


router.get('/', async(req, res)=>{
    try {
        const products = await productManager.getProducts();
        const {limit} = req.query;
        if(!limit || isNaN(limit) || parseInt(limit) <=0){
            res.status(200).json(products);
        } else {
            const filterProducts = products.slice(0, limit);
            res.status(200).json(filterProducts);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get('/:pid', async(req, res)=>{
    console.log('solicitud recibida en /api/products/:pid');
    try {
        const products = await productManager.getProducts();
        const {pid} = req.params;
        const productFind = products.find (p=>p.id ===Number(pid));
        if(!productFind) res.status(404).json({message: `Producto no encontrado con id ${pid}`});
        else res.status(200).json(productFind);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

export default router;