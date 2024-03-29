import * as dotenv from 'dotenv'
dotenv.config();

import express from "express";
import { createServer } from 'http';
import handlebars from "express-handlebars";
import fileUpload from 'express-fileupload';
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import SessionController from './src/controllers/session.controller.js';
import AppController from './src/controllers/app.controller.js';
import { config } from './src/constants/config.js';
import { Error } from './src/constants/config.js';
import { Strategy as LocalStrategy } from "passport-local";
import { logger } from './src/utils/logger.js';
import { clearCache } from './src/utils/clearCache.js';
import { UserService } from './src/services/user.service.js';
import { auth } from './src/utils/authentication.js';
import { PRODUCTS_ROUTER } from './src/routers/product.routes.js';
import { CART_ROUTER } from './src/routers/cart.routes.js';
import { SIGNUP_ROUTER } from './src/routers/signup.routes.js';
import { LOGIN_ROUTER } from './src/routers/login.routes.js';


const appController = new AppController();
const sessionController = new SessionController();
const userService = new UserService();
export function startServer(port) {

    const app = express();
    const httpServer = createServer(app);

    app.use(express.json());
    app.use(fileUpload());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use('/public/avatars/', express.static('./public/avatars'));

    httpServer.listen(port, () => {
        logger.info(`Servidor escuchando en el puerto http://localhost:${port}`)
    });

    httpServer.on("error", (error) => logger.warn("Error en servidor" + error));

    app.use(
        session({
            secret: config.secretMongo,
            saveUninitialized: false,
            resave: false,
            rolling: true,
            store: MongoStore.create({
                mongoUrl: config.mongoUri,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                ttl: config.sessionTime,
            }),
            cookie: {
                maxAge: config.sessionTime * 1000,
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(clearCache);

    const loginStrat = new LocalStrategy(userService.loginUser);
    const signupStrat = new LocalStrategy({ passReqToCallback: true }, userService.signupUser);

    passport.use('login', loginStrat);
    passport.use('signup', signupStrat);
    passport.serializeUser(userService.serializeUser);
    passport.deserializeUser(userService.deserializeUser);

    app.engine('handlebars', handlebars.engine());
    app.set('views', './src/views');
    app.set('view engine', 'handlebars');

    app.get('/', (req, res) => { res.redirect('/productos') })
        .get("/productos", auth, appController.renderRoot)
        .get('/profile', auth, appController.renderProfile)
        .get('/cart', auth, appController.renderCart)
        .post('/order', auth, appController.notifyOrder)
        .get('/logout', sessionController.destroyCredentials)
        .use('/signup', SIGNUP_ROUTER)
        .use('/login', LOGIN_ROUTER)
        .use("/api/productos", PRODUCTS_ROUTER)
        .use("/api/carrito", CART_ROUTER);

    app.all('*', function (req, res) {
        const { url, method } = req
        let msg = `Route ${method} ${url} not implemented`;
        logger.warn(msg)
        return Error.notImplemented(req, res);
    });

}



