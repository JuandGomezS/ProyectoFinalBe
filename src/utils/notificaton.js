import nodemailer from 'nodemailer';
import Twilio from 'twilio';
import { logger } from './logger.js';
import * as dotenv from 'dotenv';
import { notifications } from '../constants/config.js';
dotenv.config();


const accountSID = notifications.accountSid;
const authToken = notifications.authToken;

const transporter = nodemailer.createTransport({
    service: notifications.service,
    port: notifications.gmailPort,
    auth: {
        user: notifications.mailUser,
        pass: notifications.mailPass
    },
    tls: {
        rejectUnauthorized: false
    }
});

const notifyNewUserToAdmin = async (newUser) => {

    const emailContent = {
        from: `Ecommerce node <noreply@example.com>`,
        to: `Admin Mail <${notifications.adminMail}>`,
        subject: 'Nuevo registro',
        text: ` Nuevo usuario, descripción:
        Usuario: ${newUser.username},
        Nombre: ${newUser.name},
        Edad: ${newUser.age},
        Direccion: ${newUser.address},
        Telefono: ${newUser.telephone}`
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
}

const notifyNewOrderToAdmin = async (user, newOrder) => {

    const emailContent = {
        from: `Ecommerce node <noreply@example.com>`,
        to: `Admin Mail <${notifications.adminMail}>`,
        subject: `Nuevo pedido de ${user.name}, ${user.username}`,
        html: `<p style="font-size: 16px;">${newOrder}</p>`
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        const client = await Twilio(accountSID, authToken);
        let message = await client.messages
            .create({
                body: `Nuevo pedido de ${user.name}, ${user.username}`,
                from: `whatsapp:${notifications.twilioPhone}`,
                to: `whatsapp:${notifications.adminPhone}`
            });
        console.log(message)
    } catch (error) {
        logger.error(error);
    }
}

const notifyOrderToUser = async (userPhone) => {
    try {
        const client = await Twilio(accountSID, authToken);
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: notifications.twilioNumberSMS,
            to: `${userPhone}`,
        });
        console.log(message)
    } catch (error) {
        logger.error(error);
    }
}

export {
    notifyNewUserToAdmin,
    notifyNewOrderToAdmin,
    notifyOrderToUser
}
