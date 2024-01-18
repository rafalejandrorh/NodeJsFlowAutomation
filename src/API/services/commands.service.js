const { models } = require('./../../../libs/sequelize');

class CommandsService {

    constructor() {
        this.commandsModel = models.Commands;
    }

    async getCommands() {
        const commands = await this.commandsModel.findAll();
        console.log('getCommands', commands);
        return commands;       
    } 

}

module.exports = CommandsService;