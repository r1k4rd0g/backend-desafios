//importamos clase general:
import Controllers from './class.controller.js';
//importamos servicios:
import cartService from '../services/carts.service.js';

class CartController extends Controllers {
    constructor() {
        super(cartService)
    }
    saveProductToCart = async (req, res, next) => {
        try {
            const { cid, pid, quantity } = req.params;
            const updateCart = await cartService.saveProductToCart(cid, pid, quantity);
            res.status(200).json(updateCart);
        } catch (error) {
            next(error)
        }
    };

    removeCartById = async (req, res, next) => {
        try {
            const cid = req.params.cid;
            const response = await cartService.removeCartById(cid);
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }
    removeProductById = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const updateCart = await cartService.removeProductById(cid, pid);
            res.status(200).json(updateCart);
        } catch (error) {
            next(error)
        }
    };

    clearCart = async (req, res, next) => {
        try {
            const cid = req.params;
            const response = await cartService.clearCart(cid);
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

const  cartController = new CartController();
export default cartController;
/*export const createCart = async(req, res, next)=>{
    try {
        const nameCart = req.body
        const newCart = await cartsService.createCart(nameCart);
        res.status(201).json(newCart);
    } catch (error) {
        next (error);
    }
};*/

/*export const getAll = async(req, res, next)=>{
    try {
        const response = await cartsService.getAll()
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        next (error)
    }
}*/

/*export const getCartById = async(req, res, next)=>{
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
};*/
