const express = require("express");

const {
    getCart,
    createCart,
    removeCart,
    addCartProduct,
    removeProduct
} = require("../controllers/carts.controller");

const CART_ROUTER = express.Router();

CART_ROUTER
    .get("/:id?", getCart)
    .post("/", createCart)
    .post("/:idCart/productos/:idProd", addCartProduct)
    .delete("/:idCart/productos/:idProd", removeProduct)
    .delete("/:id", removeCart);

module.exports = CART_ROUTER;