import { config, selectedDatabase } from "../constants/config.js";
import { createFilesConnection } from "./createFileConnection.js";
import { createSQLConnection } from "./createSqlConnection.js";

function createDatabase() {

    switch (selectedDatabase) {
        // FILE SYSTEM
        default:
        case 1:
            return createFilesConnection(config.productsCollection, config.cartCollection)

        // MySQL
        case 2:
            return createSQLConnection(config.productsCollection, config.cartCollection);
        /*
        // SQLITE
        case 4:
            const {
                config: { sqlite },
            } = require("../constants/config");
            return require("./createSqlConnection")(
                productsCollection,
                cartCollection,
                sqlite
            );

        // MongoDB Local
        case 5:
            const {
                config: {
                    mongoUri: { local },
                },
            } = require("../constants/config");
            return require("./createMongoConnection")(local);

        // MongoDB Remote
        case 6:
            const {
                config: {
                    mongoUri: { remote },
                },
            } = require("../constants/config");
            return require("./createMongoConnection")(remote);

        case 7:
            return require("./createFirebaseConnection")(
                productsCollection,
                cartCollection
            ); */
    }
}

export {
    createDatabase
}
