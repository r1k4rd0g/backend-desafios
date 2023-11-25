import * as serviceProduct from '../services/product.service.js'
import { ProductDaoFS } from '../daos/filesystem/products.dao.js';
import { productValidator } from '../middlewares/productsValidator.js';
const productDaoFS = new ProductDaoFS('../daos/filesystem/data/products.json');


export const getAll =  async(req, res, next)=>{
    try {
        const products = await serviceProduct.getAll();
        const {limit} = req.query;
        if(!limit || isNaN(limit) || parseInt(limit) <=0){
            return res.status(200).json(products);
        } else {
            const limitParseado = parseInt(limit);
            const filterProducts = products.slice(0, limitParseado);
            return res.status(200).json(filterProducts);
        }
    } catch (error) {
        return next(error.message);
    }
}

export const getById = async(req, res, next)=>{
    //console.log('solicitud recibida en /api/products/:pid');
    try {
        const {pid} = req.params;
        const productFind = await serviceProduct.getById(pid);
        //const productFind = products.find (p=>p.id ===Number(pid)); // ahora con mongo el id no es un number
        if(!productFind) return res.status(404).json({message: `Producto no encontrado con id ${pid}`});
        else return res.status(200).json(productFind);
    } catch (error) {
        return next(error.message);
    }
}

export const create =  async(req, res, next)=>{
    try {
        const newProduct = await serviceProduct.create(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        return next (error.message);
    }
}
export const update =  async(req, res, next)=>{
    try {
        const {pid} = req.params;
        const updateValues = req.body;
        const productUpdate = await serviceProduct.update(Number(pid), updateValues);
        res.status(200).json(productUpdate);
    } catch (error) {
        return next (error.message);
    }
}

export const remove =  async(req, res, next)=>{
    try {
        const {pid} =req.params;
        const deletedProduct = await serviceProduct.remove(Number(pid));
        res.status(200).json(deletedProduct)
    } catch (error) {
        return next (error.message);
    }
}

