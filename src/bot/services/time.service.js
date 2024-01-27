const axios = require('axios');

const { API: { V1: { endpoint: endpointV1 } } } = require('../../../config') 

const inArray = require('../utils/tools/inArray');

class TimeService {

    constructor() {

    }

    async getCountriesCodes() {
        let result = '';
        let code = '';
    
        const { data } = await axios.get(`${endpointV1}/time/codes/countries`);
        console.log('getCountriesCodes: ', data);
        
        result = 'Códigos de Paises:\n'
        let countriesCodes = data.countries.codes;
        for (let index = 0; index < countriesCodes.length; index++) {
            code = `${countriesCodes[index]}`;
            result = `${result}${code}\n`;
        }
        return result;
    }

    async getTimezoneCodes(country = null) {
        let result, timezone = '';
        let body = {};
        if(country !== null) {
            body.country = country;
        }

        const { data } = await axios.post(`${endpointV1}/time/codes/timezones/`, body);
        console.log('getTimezoneCodes: ', data);

        result = `País Solicitado:${country}\n\n`;
        result = `${result}Husos Horarios:\n`;
        let timezones = data.timezones;
        for (let index = 0; index < timezones.length; index++) {
            timezone = `${timezones[index]}`;
            result = `${result}${timezone}\n`;
        }
        return result;
    }

    async getTime(timezones) {
        let result = '';

        for (let index = 0; index < timezones.length; index++) {
            const timezone = timezones[index];

            const { data } = await axios.post(`${endpointV1}/time`, {
                timezone: timezone
            });
            console.log(`getTime${index}: ${data}`);
            
            result = `${result}${timezone}: ${data.time}\n`;
        }

        return `${result}`;
    }

}

module.exports = TimeService;