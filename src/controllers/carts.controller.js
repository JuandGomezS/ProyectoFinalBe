import { createDatabase } from "../DAOs/createDatabase.js";
import { Error } from '../constants/config.js';
const cartDB = createDatabase().carts;

const getCart = async (req, res) => {
    const { id } = req.params;
    const cart = await cartDB.getCart(id)
    return cart ? res.json(cart) : Error.notFound(res);
}

const createCart = async (req, res) => {
    const saved = await cartDB.saveCart();
    return saved.error ? Error.notComplete(res) : res.json(saved);
}

const removeCart = async (req, res) => {
    const { id } = req.params;
    const deleted = await cartDB.deleteCart(id);
    return deleted ? res.json(deleted) : Error.notFound(res);
}

const addCartProduct = async (req, res) => {
    const { idCart, idProd } = req.params;
    const added = await cartDB.appendProduct(idCart, idProd);
    return added ? res.json(added) : Error.notFound(res);
}

const removeProduct = async (req, res) => {
    const { idCart, idProd } = req.params;
    const deleted = await cartDB.deleteCartProduct(idCart, idProd);
    return deleted ? res.json(deleted) : Error.notFound(res);
}

export {
    getCart,
    createCart,
    removeCart,
    addCartProduct,
    removeProduct
};