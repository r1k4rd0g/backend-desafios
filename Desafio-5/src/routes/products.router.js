import { Router } from 'express';
const router = Router();

import { ProductDaoFS } from '../daos/filesystem/products.dao.js';
import { productValidator } from '../middlewares/productsValidator.js';
const productDaoFS = new ProductDaoFS('../daos/filesystem/data/products.json');


router.get('/', async(req, res)=>{
    try {
        const products = await productDaoFS.getProducts();
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
    //console.log('solicitud recibida en /api/products/:pid');
    try {
        const products = await productDaoFS.getProducts();
        const {pid} = req.params;
        const productFind = products.find (p=>p.id ===Number(pid));
        if(!productFind) res.status(404).json({message: `Producto no encontrado con id ${pid}`});
        else res.status(200).json(productFind);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.post('/', productValidator, async(req, res)=>{
    try {
        const newProduct = await productDaoFS.addProduct(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error.message);
    }
})
router.put('/:pid', async(req, res)=>{
    try {
        const {pid} = req.params;
        const updateValues = req.body;
        const productUpdate = await productDaoFS.updateProduct(Number(pid), updateValues);
        res.status(200).json(productUpdate);
    } catch (error) {
        res.status(500).json(error.message);
    }
})
router.delete('/:pid', async(req, res)=>{
    try {
        const {pid} =req.params;
        const deletedProduct = await productDaoFS.deleteProduct(Number(pid));
        res.status(200).json(deletedProduct)
    } catch (error) {
        res.status(500).json(error.message);
    }
})
export default router;