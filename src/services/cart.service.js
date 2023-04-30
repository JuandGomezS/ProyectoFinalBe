import { CartRepo } from "../persistence/repos/cart.repo.js"


const persistenceModel = new CartRepo()


export class CartService {

    constructor() {
        this.persistence = persistenceModel
    }

    getCart = async (id) => {
        return await this.persistence.getCart(id);
    }

    saveCart = async (fromFront) => {
        return await this.persistence.saveCart(fromFront);
    }

    appendProduct = async (idCart, idProd) => {
        return await this.persistence.appendProduct(idCart, idProd);
    }

    deleteCartProduct = async (idCart, idProd) => {
        return await this.persistence.deleteCartProduct(idCart, idProd);
    }

    clearCart = async (idCart) => {
        return await this.persistence.clearCart(idCart);
    }

    deleteCart = async (idCart) => {
        return await this.persistence.deleteCart(idCart);
    }
}