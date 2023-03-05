import { logger } from "../utils/logger.js";

function renderRoot(req, res) {
    const user = req.user[0].username;
    const { url, method } = req
    logger.info(`User ${user} has logged in, route: ${url} method: ${method}`)
    res.render('index', { script: 'main', user })
}

export {
    renderRoot
}