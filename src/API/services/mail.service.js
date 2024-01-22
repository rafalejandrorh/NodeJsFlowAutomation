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

    async sendMail(emailData) {
        try {
            const mail = {
                from: this.user,
                to: emailData.mailTo,
                subject: emailData.subject,
                html: emailData.html,
            }
            await this.transporter.sendMail(mail);
            return { message: 'mail sent' };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MailService;