import * as cartsService from '../services/carts.service.js';

export const createCart = async(req, res, next)=>{
    try {
        const nameCart = req.body
        const newCart = await cartsService.createCart(nameCart);
        res.status(201).json(newCart);
    } catch (error) {
        next (error);
    }
};
export const getAll = async(req, res, next)=>{
    try {
        const response = await cartsService.getAll()
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        next (error)
    }
}
export const getCartById = async(req, res, next)=>{
    try {
        const {cid} = req.params;
        const cart = await cartsService.getById(cid)
        if(!cart){
            res.status(404).json({message: `Carrito no encontrado con id ${cid}`});
        } else {
        res.status(200).json(cart)};
    } catch (error) {
        next (error)
    }
};
export const saveProductToCart = async(req, res, next)=>{
    try {
        const { cid, pid } =req.params;
        const updateCart = await cartsService.saveProductToCart(cid, pid);
        res.status(200).json(updateCart);
    } catch (error) {
        next (error)
    }
};

export const removeCartById = async(req, res, next) =>{
    try {
        const cid = req.params.cid;
        const response = await cartsService.removeCartById(cid);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}
export const removeProductById = async(req, res, next)=>{
    try {
        const { cid, pid } =req.params;
        const updateCart = await cartsService.removeProductById(cid, pid);
        res.status(200).json(updateCart);
    } catch (error) {
        next (error)
    }
};
//router.put('/:cid',controllerCarts.updateCart);
//router.put('/:cid/products/:pid', controllerCarts.updateAll)
//router.delete('/:cid/products/:pid', controllerCarts.remove);
//router.delete('/:cid', controllerCarts.removeAll)
