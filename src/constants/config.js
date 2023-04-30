import * as dotenv from 'dotenv'
dotenv.config()

const selectedDatabase = 'Mongo';

const config = {
    admin: process.env.ADMIN,
    timeFormat: "DD-MM-YYYY HH:mm:ss",

    productsCollection: "products",
    cartCollection: "carts",
    userCollection: "users",

    mongoUri: process.env.MONGOURL,

    secretMongo: process.env.SECRETMONGO,
    sessionTime: process.env.TTL,
    executionMode: process.env.EXECUTION_MODE

};

const notifications = {
    accountSid: process.env.ACCOUNT_SID,
    authToken: process.env.AUTH_TOKEN,
    service: process.env.SERVICE,
    gmailPort: process.env.GMAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    adminMail: process.env.ADMIN_MAIL,
    twilioPhone: process.env.TWILIO_PHONE,
    adminPhone: process.env.ADMIN_PHONE,
    twilioNumberSMS: process.env.TWILIO_NUMBER_SMS
};


const Error = {
    notFound: (res) =>
        res.status(404).json({ error: -10, description: "Item not found" }),

    unauthorized: (req, res) =>
        res.status(401).json({
            error: -1,
            description: `Unauthorized execution of ${req.method} on ${req.hostname}${req.originalUrl}`,
        }),

    notComplete: (res) =>
        res.status(400).json({
            error: -20,
            description: "Task could not be completed"
        }),

    notImplemented: (req, res) =>
        res.status(404).json({
            error: -2,
            description: `Route ${req.hostname}${req.originalUrl} method ${req.method} not implemented `,
        }),

    cartNotFound: (res) =>
        res.status(404).json({ error: -10, description: "Cart not found" }),

};

export { config, Error, selectedDatabase, notifications };
