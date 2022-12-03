const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const PRODUCTS_ROUTER = require('./src/routers/product.routes');
const CARTS_ROUTER = require('./src/routers/cart.routes')
const app = express();
const PORT = process.env.PORT || 8080;
const { Error } = require('./src/constants/config');


app.get("/", (req, res) => {
    res.send('<h1 style="color:black"> Bienvenidos al Servidor Express </h1>');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", PRODUCTS_ROUTER);
app.use("api/carrito", CARTS_ROUTER)

app.get('*', function (req, res){
    return Error.notImplemented(req, res);
});

const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});

server.on("error", (error) => console.log("Error en servidor", error));