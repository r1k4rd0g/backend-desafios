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
        console.log(typeof(pageSize),'console 1: pageSize',limit)
        const searchQuery = query || '';
        console.log('console 2:',searchQuery);
        const sortOrder = (sort === 'asc' || sort === 'desc') ? sort : '';
        console.log(typeof(sortOrder),'console 3:',sortOrder);
        const response = await serviceProduct.getAll(pageNumber, pageSize, sortOrder);
        const prevPage = response.prevPage;
        const nextPage = response.nextPage;
        const prevLink = response.hasPrevPage ? `http://localhost:8088/api/products/?page=${prevPage}&limit=${pageSize}&sort=${sortOrder}` : null;
        const nextLink = response.hasNextPage ? `http://localhost:8088/api/products/?page=${nextPage}&limit=${pageSize}&sort=${sortOrder}` : null;
        const status = 'success';
        res.json({
            status,
            products: response.docs,
            payload: response.totalDocs,
            info:{
                totalPages : response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                prevLink : prevLink,
                nextLink: nextLink,
            }
        })
    } catch (error) {
        const status = 'error';
        next(error);
    }
};

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


/** respuesta personalizada para el método getAll */
/*const toJson = ({response}) =>{
    if(Array.isArray(docs)){

        const hasPrevPage = pageNumber > 1;
        const hasNextPage = pageNumber < totalPages;
        const status = response.doc.length > 0 ? "success" : "error"
        const prevPage = hasPrevPage ? pageNumber - 1 : null;
        const nextPage = hasPrevPage ? pageNumber + 1 : null;
        const prevLink = hasPrevPage ? `http://localhost:8088/api/products/?page=${prevPage}&limit=${pageSize}` : null;
        const nextLink = hasNextPage ? `http://localhost:8088/api/products/?page=${nextPage}&limit=${pageSize}` : null;

        return {
            status,
            payload: totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        };
    } else {
        return{
            status: "error",
        }
    }
};*/