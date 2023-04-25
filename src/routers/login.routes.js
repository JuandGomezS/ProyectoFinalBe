import express from 'express';
import passport from "passport";
import SessionController from '../controllers/session.controller.js';

const sessionController = new SessionController();

const LOGIN_ROUTER = express.Router();

LOGIN_ROUTER
    .get("/", sessionController.renderLogin)
    .post("/", passport.authenticate('login', { failureRedirect: "/login/error", successRedirect: "/" }))
    .get("/error", sessionController.renderFailLogin);

export { LOGIN_ROUTER }