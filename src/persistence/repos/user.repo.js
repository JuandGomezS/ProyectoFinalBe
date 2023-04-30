import { DaoFactory } from "../daos/dao.factory.js"
import { selectedDatabase } from "../../constants/config.js"

const DaoModel = new DaoFactory()

export class UserRepo {

    dao
    daoCart

    constructor() {
        this.dao = DaoModel.getUserDao(selectedDatabase)
        this.daoCart = DaoModel.getDaoCart(selectedDatabase)
    }

    getUser = async (username) => {
        return await this.dao.getUser(username)
    }

    loginUser = async (username, password, done) => {
        return await this.dao.loginUser(username, password, done);
    }

    signupUser = async (username, password, req, done) => {
        let cart = await this.daoCart.saveCart(true);
        return await this.dao.signupUser(username, password, req, cart, done);
    }

    serializeUser = (username, done) => {
        return this.dao.serializeUser(username, done);
    }

    deserializeUser = async (user, done) => {
        return await this.dao.deserializeUser(user, done)
    }

}