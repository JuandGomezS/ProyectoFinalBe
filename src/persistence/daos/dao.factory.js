import { MongoConnection } from './dbConnections/MongoConnection.js';
import { CartDaoMongo } from './Cart/Mongo/cart.dao.js';
import { ProductDaoMongo } from './Products/Mongo/product.dao.js';
import { UserDao } from './user/user.dao.js';
import { mongoProduct, mongoCart, mongoUser } from './Mongo.models.js';

const mongoConnection = new MongoConnection();
mongoConnection.connect();

export class DaoFactory {
    getDaoProduct(option) {
        let daoProduct;
        switch (option) {
            default:
            case 'Mongo':
                daoProduct = new ProductDaoMongo(mongoProduct);
                break;
        }
        return daoProduct
    }

    getDaoCart(option) {
        let daoCart;
        let daoProduct
        switch (option) {
            default:
            case 'Mongo':
                daoProduct = new ProductDaoMongo(mongoProduct);
                daoCart = new CartDaoMongo(mongoCart, daoProduct);
                break;
        }
        return daoCart
    }

    getUserDao(option){
        let userDao;
        switch (option) {
            default:
            case 'Mongo':
                userDao = new UserDao(mongoUser);
                break;
        }
        return userDao
    }
}