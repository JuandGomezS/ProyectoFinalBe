import { Error } from '../constants/config.js';
import { CartService } from '../services/cart.service.js';

const cartService = new CartService();

export default class CartController {

    getCart = async (req, res) => {
        const { id } = req.params;
        const cart = await cartService.getCart(id)
        return cart ? res.json(cart) : Error.notFound(res);
    }

    createCart = async (req, res) => {
        const saved = await cartService.saveCart();
        return saved.error ? Error.notComplete(res) : res.json(saved);
    }

    removeCart = async (req, res) => {
        const { id } = req.params;
        const deleted = await cartService.deleteCart(id);
        return deleted ? res.json(deleted) : Error.notFound(res);
    }

    addCartProduct = async (req, res) => {
        const { idCart, idProd } = req.params;
        const added = await cartService.appendProduct(idCart, idProd);
        if (!added) return Error.notFound(res);
        res.json(added);
    }

    removeProduct = async (req, res) => {
        const { idCart, idProd } = req.params;
        const deleted = await cartService.deleteCartProduct(idCart, idProd);
        return deleted ? res.json(deleted) : Error.notFound(res);
    }
}
