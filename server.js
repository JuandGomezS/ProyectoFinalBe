import * as dotenv from 'dotenv';
import { startServer } from './app.js';
import { executeServerCluster } from './src/utils/excetuteClusterMode.js';
import { logger } from './src/utils/logger.js';
import parseArgs from 'yargs/yargs';

dotenv.config();

const port = process.env.PORT || 8080;

const { mode } = parseArgs(process.argv.slice(2))
    .option('mode', {
        alias: 'm',
        describe: 'Modo de ejecución del servidor',
        choices: ['FORK', 'CLUSTER'],
        default: 'FORK'
    })
    .help()
    .argv;

switch (mode.toLowerCase()) {
    case "cluster":
        logger.info("Executing app in cluster mode");
        executeServerCluster(port)
        break;

    default:
        logger.info("Executing app in fork mode");
        startServer(port);
        break;
}