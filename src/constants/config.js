require('dotenv').config({ path: '../../.env' });

const config = {
    admin: process.env.ADMIN === 'true',
    timeFormat: "DD-MM-YYYY HH:mm:ss",
};

console.log(config)

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
        res.status(401).json({
            error: -2,
            description: `Route ${req.hostname}${req.originalUrl} method ${req.method} not implemented `,
        }),

};

module.exports = { config, Error }; 