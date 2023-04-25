import { logger } from "../utils/logger.js";
import { getHostName } from "../utils/miscelanius.js";
import { notifyNewOrderToAdmin, notifyOrderToUser } from "../utils/notificaton.js";
import { ProductService } from "../services/product.service.js";
import { CartService } from "../services/cart.service.js";

const productService = new ProductService();
const cartService = new CartService();


export default class AppController {

    renderRoot = async (req, res) => {
        let products = await productService.getAllProducts();
        let exist = products.length > 0
        const user = req.user[0].name;
        const cartId = req.user[0].cartId;
        const hostName = getHostName(req);
        const { url, method } = req
        logger.info(`User ${req.user[0].username} has logged in, route: ${url} method: ${method}`)
        res.render('index', { script: 'main', user, cartId, products, hostName, listExists: exist, navBar: true })
    }

    renderProfile = (req, res) => {
        const userReq = req.user[0];
        const userInfo = {
            username: userReq.username,
            name: userReq.name,
            address: userReq.address,
            age: userReq.age,
            telephone: userReq.telephone,
            avatar: userReq.avatar
        }
        const { url, method } = req
        logger.info(`User ${userReq.username} has logged in, route: ${url} method: ${method}`)
        res.render('profile', { navBar: true, userInfo, user: userReq.name, script: 'main' })
    }

    renderCart = async (req, res) => {
        const cartId = req.user[0].cartId;
        let cart = await cartService.getCart(cartId);
        let cartProducts = cart[0].products;
        let totalOrder = cartProducts.reduce((acc, objeto) => acc + objeto.total_price, 0);
        const user = req.user[0].name;
        const hostName = getHostName(req);
        const { url, method } = req
        logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
        res.render('cart_detail', { script: 'cart', user, cartId, products: cartProducts, hostName, listExists: cartProducts.length > 0, totalOrder, navBar: true })
    }

    notifyOrder = async (req, res) => {
        const cartId = req.user[0].cartId;
        let cart = await cartService.getCart(cartId);
        cartService.clearCart(cartId);
        let cartProducts = cart[0].products;
        const newOrder = JSON.stringify(cartProducts);
        await notifyNewOrderToAdmin(req.user[0], newOrder);
        await notifyOrderToUser(req.user[0].telephone);
        res.json({ error: 0, message: 'Order Created' })
    }
}
