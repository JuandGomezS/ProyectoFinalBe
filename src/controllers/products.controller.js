const Product = require('../models/Product/Product.database');
const productDB = new Product("products");
const { config: { admin }, Error } = require("../constants/config");

const ProductBody = require('../models/Product/Product.model');

const getProducts = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const product = await productDB.getProduct(id)
        return product ? res.json(product) : Error.notFound(res);
    }
    let productos = await productDB.getAllProducts();
    res.json(productos);
}

const appendProduct = async (req, res) => {
    if (!admin) return Error.unauthorized(req, res);
    const saved = await productDB.saveProduct(new ProductBody(req.body));
    return saved.error ? Error.notComplete(res) : res.json(saved);
}

const updateProduct = async (req, res) => {
    if (!admin) return Error.unauthorized(req, res);
    const { id } = req.params;
    const updated = await productDB.updateProduct(id, req.body);
    return updated ? res.json(updated) : Error.notFound(res);
}

const removeProduct = async (req, res) => {
    if (!admin) return Error.unauthorized(req, res);
    const { id } = req.params;
    const deleted = await productDB.deleteProduct(id);
    return deleted.error ? Error.notFound(res) : res.json(deleted);
}

module.exports = {
    getProducts,
    appendProduct,
    updateProduct,
    removeProduct
};