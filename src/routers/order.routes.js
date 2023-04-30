import express from 'express';
import OrderController from '../controllers/order.controller';
import OrderController from '../controllers/order.controller';

const orderController = new OrderController
const ORDER_ROUTER = express.Router();

ORDER_ROUTER
    .post("/", orderController.postOrder)

export { SIGNUP_ROUTER }