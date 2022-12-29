import { config, selectedDatabase } from "../constants/config.js";
import { createFilesConnection } from "./createFileConnection.js";
import { createSQLConnection } from "./createSqlConnection.js";
import { createMongoConnection } from "./createMongoConnection.js";

function createDatabase() {

    switch (selectedDatabase) {
        // FILE SYSTEM
        default:
        case 1:
            return createFilesConnection(config.productsCollection, config.cartCollection)

        // MySQL y SQLITE
        case 2:
        case 3:
            return createSQLConnection(config.productsCollection, config.cartCollection);

        //MONGO ATLAS
        case 4:
            return createMongoConnection(config.mongoUri)

        /* case 7:
            return crea */
    }
}

export {
    createDatabase
}
