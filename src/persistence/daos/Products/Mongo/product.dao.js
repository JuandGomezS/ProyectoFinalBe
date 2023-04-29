import moment from "moment";
import { transformToDTO } from "../../../dtos/product.dto.js";
import { config as configRoot } from "../../../../constants/config.js";


export class ProductDaoMongo {
    constructor(model) {
        this.model = model
    }

    getAllProducts = async () => {
        let products = await this.model.find({}, { __v: 0, _id: 0 }).lean();
        if (!products.length) {
            const response = {
                error: 1,
                message: `Not products found`
            }
            return response;
        } else {
            return transformToDTO(products);
        }
    }

    getProduct = async (id) => {
        try {
            let product = await this.model.find({ id: id.toString() }, { __v: 0 });
            return transformToDTO(product);
        } catch (error) {
            return false;
        }
    }

    saveProduct = async (data) => {
        try {
            let last = await this.model.find({}).sort({ id: -1 }).limit(1);
            let newId = last.length > 0 ? parseInt(last[0].id + 1) : 1;

            let prod = new this.model({
                id: newId,
                timestamp: moment().format(configRoot.timeFormat),
                ...data
            });

            await prod.save();

            return await this.getProduct(newId);

        } catch (error) {
            const response = {
                error: 1,
                message: `Error saving product`
            }
            return response;
        }
    }


    deleteProduct = async (id) => {
        let response = {};
        let del = await this.model.deleteOne({ id: id });
        if (del.deletedCount >= 1) {
            response.error = 0,
            response.message = `The product with id: ${id} has been deleted`;
        } else {
            response.error = 1;
            response.message = "Task could not be completed, product not found";
        }
        return response;
    }

    updateProduct = async (id, data) => {
        try {

            let upt = await this.model.updateOne({ id: id }, data);
            if (upt.modifiedCount) return await this.getProduct(id);

        } catch (error) {
            return false;
        }
    }

}