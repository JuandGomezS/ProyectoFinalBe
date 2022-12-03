const express = require("express");
const { productValidator } = require('../validators/product.validator')

const {
    getProducts,
    appendProduct,
    updateProduct,
    removeProduct,
} = require("../controllers/products.controller");

const PRODUCTS_ROUTER = express.Router();

PRODUCTS_ROUTER
    .get("/:id?", getProducts)
    .post("/", productValidator, appendProduct)
    .put("/:id", productValidator, updateProduct)
    .delete("/:id", removeProduct);

module.exports = PRODUCTS_ROUTER;