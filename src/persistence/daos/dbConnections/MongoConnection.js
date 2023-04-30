import mongoose from "mongoose";
import { config } from "../../../constants/config.js";
import { logger } from "../../../utils/logger.js";
import * as dotenv from 'dotenv';

dotenv.config();

//Singleton to connect Mongo DB
export class MongoConnection {
    constructor() {
        if (!MongoConnection.instance) {
            const uri = config.mongoUri;
            mongoose.set("strictQuery", false);
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            MongoConnection.instance = this;
        }
        return MongoConnection.instance;
    }

    async connect() {
        try {
            mongoose.connection.on('open', () => {
                logger.info('Connected to MongoDB Atlas');
            });
        } catch (err) {
            logger.info('Error connecting to MongoDB Atlas', err);
        }
    }

    async disconnect() {
        console.log("Closing mongo Atlas");
        mongoose.connection.close()
    }
}