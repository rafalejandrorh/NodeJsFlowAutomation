const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');

const { smtp: { gmail: { host, port, user, pass } } } = require('../../../config/');

class MailService {

    user = user;
    pass = pass;

    constructor(user = this.user, pass = this.pass) {

        this.transporter = nodemailer.createTransport({
            host: host,
            secure: true,
            port: port,
            auth: {
                user: user,
                pass: pass
            }
        });
    }

    async sendMail(email, data) {
        try {
            const mail = {
                from: this.user,
                to: email,
                subject: data.subject,
                html: data.html,
            }
            await this.transporter.sendMail(mail);
            return { message: 'mail sent' };
        } catch (error) {
            console.log(error);
            throw boom.internal();
        }
    }
}

module.exports = MailService;