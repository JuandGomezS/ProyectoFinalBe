import { userService } from "../services/user.service.js";
import { CartService } from "../services/cart.service.js";


const userPersitence = new userService();
const cartPersistence = new CartService();

export default class OrderController {

    postOrder = async (req, res) => {
        const user = await userPersitence.getUser(req.session.passport.user);//
        const cart = await cartPersistence.getCart(user.cartId);//

        const buyedProducts = cart[0].productos.map(producto => {
            return `${producto.nombre} - ${producto.precio}`
        }).join("<br>")

        const html = `<h1>Nuevo Pedido</h1>
        ${buyedProducts}`;

        await sendEmailOrder(html, user[0].nombre, user[0].email);

        //SEND WHATSAPP
        const waMessage = {
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: "whatsapp:" + process.env.TWILIO_REG_PHONE_WHATSAPP,
            to: 'whatsapp:+573208391894'
        }

        await sendOrder(waMessage);

        // SEND SMS
        const smsMessage = {
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: process.env.TWILIO_REG_PHONE_SMS,
            to: '+573208391894'
        }

        await sendOrder(smsMessage);

        // RESPONSE
        res.json({
            status: "pedido enviado"
        })

    }
}
