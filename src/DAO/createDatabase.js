import { config } from "../constants/config.js";
import { createMongoConnection } from "./createMongoConnection.js";

function createDatabase() {
    return createMongoConnection(config.mongoUri);
}

export { createDatabase }