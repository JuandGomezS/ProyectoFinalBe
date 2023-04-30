import { DaoFactory } from "../daos/dao.factory.js";

const daoModel = new DaoFactory();

export class CartRepo {

    dao

    constructor() {
        this.dao = daoModel.getDaoCart('Mongo');
    }

    getCart = async (id) => {
        return await this.dao.getCart(id);
    }

    saveCart = async (fromFront) => {
        return await this.dao.saveCart(fromFront);
    }

    appendProduct = async (idCart, idProd) => {
        return await this.dao.appendProduct(idCart, idProd);
    }

    deleteCartProduct = async (idCart, idProd) => {
        return await this.dao.deleteCartProduct(idCart, idProd);
    }

    clearCart = async (idCart) => {
        return await this.dao.clearCart(idCart);
    }

    deleteCart = async (idCart) => {
        return await this.dao.deleteCart(idCart);
    }


}