import { logger } from "../utils/logger.js";

export default class SessionController {

    destroyCredentials = (req, res) => {
        const { url, method } = req
        logger.info(`Access to route: ${url} method: ${method}`)
        if (!req.isAuthenticated()) {
            return res.redirect('/')
        }
        const username = req.user[0].name;
        req.session.destroy((err) => {
            if (err) console.error(err);
            else
                return res
                    .clearCookie("connect.sid")
                    .render("disconnect_user", { user: username, script: 'redirect' });
        });
    }

    renderSignUp = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /signup method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render("signup", { script: 'signup' });
    }

    renderFailLogin = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /login/error method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render('error', { process: 'LOGIN' })
    }

    renderFailSignUp = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /signup/error method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render('error', { process: 'SIGNUP' })
    }

    renderLogin = (req, res) => {
        const { method } = req
        logger.info(`Access to route: /login method: ${method}`)
        return req.isAuthenticated()
            ? res.redirect("/")
            : res.render("login");
    }

    savePicturesLocal = async (req, res, next) => {
        try {
            let ext = req.files.avatar.mimetype.split('/')[1];
            let avatar = req.files.avatar;
            avatar.mv(`./public/avatars/${req.body.username}.${ext}`);
        } catch (error) {
            logger.error(error)
        }
        next();
    };

}

