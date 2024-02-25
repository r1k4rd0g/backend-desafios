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
