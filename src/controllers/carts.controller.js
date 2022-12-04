const Cart = require('../models/Cart/Cart.database');
const cartDB = new Cart("carts");
const { config: { admin }, Error } = require("../constants/config");

const CartBody = require('../models/Cart/Cart.model');

const getCart = async (req, res) => {
    const { id } = req.params;
    const cart = await cartDB.getCart(id)
    return cart ? res.json(cart) : Error.notFound(res);
}

const createCart = async (req, res) => {
    const saved = await cartDB.saveCart(new CartBody());
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

module.exports = {
    getCart,
    createCart,
    removeCart,
    addCartProduct,
    removeProduct
};