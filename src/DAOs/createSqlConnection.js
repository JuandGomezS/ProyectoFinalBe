import { SqlCart } from "../models/SQL/Cart/cart.database.js";
import { SqlProduct } from "../models/SQL/Product/product.database.js";
import { config } from "../constants/config.js";

function createSQLConnection(productsCollection, cartCollection) {
    return {
        products: new SqlProduct(productsCollection, config.mySql),
        carts: new SqlCart(cartCollection,  config.mySql),
    };
}

export { createSQLConnection }