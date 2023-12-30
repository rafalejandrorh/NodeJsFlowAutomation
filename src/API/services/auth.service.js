const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const MailService = require('./mail.service');
const UserService = require('./user.service');

class AuthService {

    constructor() {
        this.mailService = new MailService();
        this.userService = new UserService();
    }

    async login(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw boom.notFound('User Not Found');
        }
    
        if(!await bcrypt.compare(password, user.password)) {
            throw boom.unauthorized('Incorrect Password');
        }
        
        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role,
            email: user.email
        }
        const token = jwt.sign(payload, config.secretKeyJwt, {
            expiresIn: '8h'
        });
        return {
            user,
            token
        };
    }

    async sendRecovery(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw boom.notFound('User Not Found');
        }

        const payload = { 
            sub: user.id,
            email: user.email
        };
        const token = jwt.sign(payload, config.secretKeyJwt, {expiresIn: '15min'});
        const link = `http://myfrontend.com/recovery?token=${token}`;
        await this.userService.update(user.id, {recoveryToken: token});

        dataEmail = {
            mailTo: `${user.email}`,
            subject: 'Email para recuperar contraseña',
            html: `<b>Ingresa a este link => ${link}</b>`
        };
        const sendMail = await this.mailService.sendMail(dataEmail);
        return sendMail;
    }

    async changePassword(token, newPassword) {
        try {
            const payload = jwt.verify(token, config.secretKeyJwt);
            const user = await this.userService.findOne(payload.sub);
            if (user.recoveryToken !== token) {
                throw boom.unauthorized();
            }
            
            const hash = await bcrypt.hash(newPassword, 10);
            await this.userService.update(user.id, {recoveryToken: null, password: hash});

            return { message: 'password changed' };
        } catch (error) {
            throw boom.unauthorized();
        }
    }
}

module.exports = AuthService;