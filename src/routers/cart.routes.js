import { Router } from "express";
import CartController from '../controllers/carts.controller.js'

const cartController = new CartController();

const CART_ROUTER = Router();

CART_ROUTER
    .get('/:id/productos', cartController.getCart)
    .post('/', cartController.createCart)
    .post('/:idCart/productos/:idProd', cartController.addCartProduct)
    .delete('/:idCart/productos/:idProd', cartController.removeProduct)
    .delete('/:id', cartController.removeCart);

export { CART_ROUTER }