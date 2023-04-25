import express from 'express';
import passport from "passport";
import SessionController from '../controllers/session.controller.js';

const sessionController = new SessionController();

const SIGNUP_ROUTER = express.Router();

SIGNUP_ROUTER
    .get("/", sessionController.renderSignUp)
    .post("/", sessionController.savePicturesLocal, passport.authenticate('signup', { failureRedirect: "/signup/error", successRedirect: "/" }))
    .get("/error", sessionController.renderFailSignUp);

export { SIGNUP_ROUTER }