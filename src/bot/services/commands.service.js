const axios = require('axios');

const { API: { V1: { endpoint : endpointV1 } } } = require('../../../config') 

//const ExchangeVcoudService = require('../../API/services/dollar.service');

class CommandsService {

    constructor() {
    }

    async getListCommands() {
        let name, description, status, hasAuth = '';
        let result = '';

        //const dollarPrice = await this.service.getDollarPrice();
        const { data } = await axios.get(`${endpointV1}/commands/`);
        console.log('getListCommands: ', data);
    
        result = 'Lista de Comandos: \n\n';
        for (let index = 0; index < data.length; index++) {
            name = `Comando: ${data[index].name} `;
            description = `\nDescripción: ${data[index].description}`;
            status = `\nEstatus: ${data[index].status === true ? 'Activo' : 'Inactivo'}`;
            hasAuth = `\nRequiere Autenticación: ${data[index].hasAuth === true ? 'Si' : 'No'}`;
            result = `${result}${name}${status}${hasAuth}${description}\n\n`;
        }
        return result;
    }

}

module.exports = CommandsService;