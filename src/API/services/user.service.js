const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { v4: uuidV4 } = require('uuid');

const { models } = require('./../../../libs/sequelize');

class UserService {
  
    constructor() {
        this.userModel = models.User;
    }

    async create(data) {
        const hashPassword = await bcrypt.hash(data.password, 15);
        const newUser = await this.userModel.create({
            ...data,
            uuid: uuidV4(),
            password: hashPassword
        });
        delete newUser.dataValues.password;
        return newUser;
    }

    async find() {
        const user = await this.userModel.findAll();
        return user;
    }

    async findByEmail(email) {
        const user = await this.userModel.findOne({
            where: { email }
        });
        return user;
    }

    async findOne(id) {
        const user = await this.userModel.findByPk(id);
        if(!user) {
            throw boom.notFound('User Not Found');
        }
        return user;
    }

    async findByTelegramIdAndUsername(username, telegramId) {
        const user = await this.userModel.findAll({
            where: {                
                username: username,
                telegramId: telegramId
            },
            attributes: ['username', 'telegram_id']
        });

        if(!user) {
            throw boom.notFound('User Not Found');
        }

        //delete user.dataValues.password;
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const updatedUser = await user.update(changes);
        return updatedUser;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return id;
    }
}

module.exports = UserService;
