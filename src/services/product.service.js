import { ProductRepo } from "../persistence/repos/product.repo.js"

const persistenceModel = new ProductRepo()

export class ProductService {

    constructor() {
        this.persistence = persistenceModel
    }

    getAllProducts = async () => {
        return await this.persistence.getAllProducts();
    }

    saveProduct = async (product) => {
        return await this.persistence.saveProduct(product);
    }

    getProductById = async (id) => {
        return await this.persistence.getProductById(id)
    }

    updateProduct = async (id, data) => {
        return await this.persistence.updateProduct(id, data);
    }

    deleteProduct = async (id) => {
        return await this.persistence.deleteProduct(id);
    }
}