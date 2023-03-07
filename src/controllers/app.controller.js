import { logger } from "../utils/logger.js";
import { getProductstoFront } from "./products.controller.js";
import { getHostName } from "../utils/miscelanius.js";

async function renderRoot(req, res) {
    let products = await getProductstoFront();
    let exist =products.length > 0
    const user = req.user[0].name;
    const cartId = req.user[0].cartId;
    const hostName = getHostName(req);
    const { url, method } = req
    logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
    res.render('index', { script: 'main', user, cartId, products: products, hostName, listExists: exist, navBar: true })
}

function renderProfile(req, res) {
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
    res.render('profile', {  navBar: true, userInfo , user: userReq.name, script: 'main'})
}

export {
    renderRoot,
    renderProfile
}