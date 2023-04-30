
import { config, Error } from '../constants/config.js';
import { ProductService } from '../services/product.service.js';

const productService = new ProductService()

export default class ProductController {

    getProducts = async (req, res) => {
        const { id } = req.params;
        if (id) {
            const product = await productService.getProductById(id)
            return product ? res.json(product) : Error.notFound(res);
        }
        let productos = await productService.getAllProducts();
        res.json(productos);
    }

    appendProduct = async (req, res) => {
        if (!config.admin) return Error.unauthorized(req, res);
        const saved = await productService.saveProduct(req.body);
        return saved.error ? Error.notComplete(res) : res.json(saved);
    }

    updateProduct = async (req, res) => {
        if (!config.admin) return Error.unauthorized(req, res);
        const { id } = req.params;
        const updated = await productService.updateProduct(id, req.body);
        return updated ? res.json(updated) : Error.notFound(res);
    }

    removeProduct = async (req, res) => {
        if (!config.admin) return Error.unauthorized(req, res);
        const { id } = req.params;
        const deleted = await productService.deleteProduct(id);
        return deleted.error ? Error.notFound(res) : res.json(deleted);
    }
}
