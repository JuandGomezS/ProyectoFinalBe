import { DaoFactory } from "../daos/dao.factory.js"
import { selectedDatabase } from "../../constants/config.js"

const DaoModel = new DaoFactory()

export class ProductRepo {

    dao

    constructor() {
        this.dao = DaoModel.getDaoProduct(selectedDatabase)
    }

    getAllProducts = async () => {
        return await this.dao.getAllProducts();
    }

    saveProduct = async (product) => {
        return await this.dao.saveProduct(product);
    }

    getProductById = async (id) => {
        return await this.dao.getProduct(id)
    }

    updateProduct = async (id, data) => {
        return await this.dao.updateProduct(id, data);
    }

    deleteProduct = async (id) => {
        return await this.dao.deleteProduct(id);
    }
}