import { Router } from "express";
import { productValidator } from '../validators/product.validator.js';
import ProductController from '../controllers/products.controller.js';

const productController = new ProductController();

const PRODUCTS_ROUTER = Router();

PRODUCTS_ROUTER
    .get("/:id?", productController.getProducts)
    .post("/", productValidator, productController.appendProduct)
    .put("/:id", productValidator, productController.updateProduct)
    .delete("/:id", productController.removeProduct);

export { PRODUCTS_ROUTER }