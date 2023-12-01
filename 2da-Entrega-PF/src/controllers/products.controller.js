import mongoose from 'mongoose';
import * as serviceProduct from '../services/product.service.js'
import { ProductDaoFS } from '../daos/filesystem/products.dao.js';
import { productValidator } from '../middlewares/productsValidator.js';
const productDaoFS = new ProductDaoFS('../daos/filesystem/data/products.json');


export const getAllCtr =  async(req, res, next)=>{
    try {
        const {page, limit, query, sort} = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const searchQuery = query || '';
        const sortOrder = (sort === 'asc' || sort === 'desc') ? sort : '';
        if(isNaN(pageNumber) || pageNumber <1 ){
            pageNumber = 1; // si page no es un nº válido, se establece 1 como default
        }
        if(isNaN(pageSize)|| pageSize<1 ){
            pageSize = 10; //si el limit no es un nº válido, se establece 10 como default
        }
        const products = await serviceProduct.getAll(pageNumber, pageSize, searchQuery, sortOrder);
        
            return res.status(200).json(products);
    } catch (error) {
        next(error.message);
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
        next(error.message);
    }
}

export const create = async(req, res, next)=>{
    try {
        const newProduct = await serviceProduct.create(req.body);
            return res.status(201).json(newProduct);
    } catch (error) {
        next (error.message);
    }
}
export const update = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const updateValues = req.body;
        //const productUpdate = await serviceProduct.update(Number(pid), updateValues);
        const productUpdate = await serviceProduct.update(id, updateValues);
        if(!productUpdate){
            return res.status(400).json({messages: `error al actualizar el producto con id ${id}`})
        }else {
            return res.status(200).json(productUpdate)
        };
    } catch (error) {
        next (error.message);
    }
}

export const remove = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const deletedProduct = await serviceProduct.remove(id);
        if(!deletedProduct){
            return res.status(400).json({messages: `error al eliminar el producto con id: ${id}`})
        } else {return res.status(200).json(deletedProduct);}
    } catch (error) {
        next (error.message);
    }
}

export const createFileProductCtr = async(req, res, next) =>{
    try {
        const newProducts = await serviceProduct.createFileProduct();
        if(!newProducts) throw new Error("validation error");
        return res.status(201).send('Archivo creado correctamente');
    } catch (error) {
        next(error)
    }
}