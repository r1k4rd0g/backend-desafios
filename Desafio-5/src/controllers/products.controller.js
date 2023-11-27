import mongoose from 'mongoose';
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
        const {id} = req.params;
        console.log({id})
        const productFind = await serviceProduct.getById(id);
        //const productFind = products.find (p=>p.id ===Number(pid)); // ahora con mongo el id no es un number
        if(!productFind) return res.status(404).json({message: `Producto no encontrado con id ${id}`});
        else return res.status(200).json(productFind);
    } catch (error) {
        return next(error.message);
    }
}

export const create = async(req, res, next)=>{
    try {
        const newProduct = await serviceProduct.create(req.body);
        if(!newProduct){
            return res.status(500).json({message: 'error al crear producto'})
        } else {
            return res.status(200).json(newProduct);
        }
    } catch (error) {
        return next (error.message);
    }
}
export const update = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const updateValues = req.body;
        //const productUpdate = await serviceProduct.update(Number(pid), updateValues);
        const productUpdate = await serviceProduct.update(id, updateValues);
        if(!productUpdate){
            return res.status(404).json({messages: `error al actualizar el producto con id ${id}`})
        }else {
            return res.status(200).json(productUpdate)
        };
    } catch (error) {
        return next (error.message);
    }
}

export const remove = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const deletedProduct = await serviceProduct.remove(id);
        if(!deletedProduct){
            return res.status(404).json({messages: `error al eliminar el producto con id: ${id}`})
        } else {return res.status(200).json(deletedProduct);}
    } catch (error) {
        return next (error.message);
    }
}

