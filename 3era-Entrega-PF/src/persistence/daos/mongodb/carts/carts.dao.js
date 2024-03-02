import { CartModel } from "./carts.model.js";
import MongoDao from "../mongo.dao.js";

export default class CartMongoDao extends MongoDao {
    constructor() {
        super(CartModel);
    }

    async saveProductToCart(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid).populate('onCart.product');
            console.log('consola linea 35 cart dao', cart, 'id de product:', pid)
            if (!cart) throw new error('no existe el carrito');
            const productExist = cart.onCart.find(item => item.product._id.toString() === pid);
            if (productExist) {
                productExist.quantity += quantity;
                console.log('productExist:', productExist)
            } else {
                cart.onCart.push({ product: pid, quantity: quantity || 1 });
            }
            cart.save();
            return cart
            //return await CartModel.findByIdAndUpdate();
        } catch (error) {
            console.log(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
            throw new Error(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
        }
    }

    async removeProductById(cid, pid) {
        try {

            const updatedCart = await CartModel.findOneAndUpdate(
                { _id: cid },
                { $pull: { 'onCart': { product: pid } } },
                { new: true }
            ).populate('onCart.product');
            if (!updatedCart) throw new error('no existe el carrito');
            //console.log('Estado del carrito después de eliminar el producto:', updatedCart);
            return updatedCart;

        } catch (error) {
            console.log(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
            throw new Error(`error al actualizar el carrito de id: ${cid}, msg: ${error}`);
        }
    }

    async clearCart(cid) {
        try {
            console.log('linea 78 cart dao', cid);
            let cartId = cid;
            if (typeof cid === 'object' && cid.cid) {
                cartId = cid.cid;
            }
            const updatedCart = await CartModel.findOneAndUpdate(
                { _id: cartId }, // Utiliza solo el ID como criterio de búsqueda
                { onCart: [] }, // Actualiza el campo onCart con un array vacío
                { new: true }
            ).populate('onCart.product');
            if (!updatedCart) {
                throw new Error('No se encontró el carrito');
            }

            console.log('Carrito vaciado:', updatedCart);
            return updatedCart;
        } catch (error) {
            console.log(`Error al vaciar el carrito de id: ${cid}, mensaje: ${error}`);
            throw new Error(`Error al vaciar el carrito de id: ${cid}, mensaje: ${error}`);
        }
    }
}
