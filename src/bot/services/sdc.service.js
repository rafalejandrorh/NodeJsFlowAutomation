const Moment = require('moment');
const axios = require('axios');

class SdcService {

    constructor() {
        //this.service = new ExchangeVcoudService();
        Moment.locale('es');
    }

    async updateTdpQaLegacyToken() {
        let result = '';
        let accessToken, refreshToken = '';
    
        const { data } = await axios.get('http://localhost:6001/api/v1/SDC/QA/TDP/Token/');
        console.log('updateTdpQaLegacyToken: ', data);

        accessToken = `Access Token: \n${data.access_token}`;
        refreshToken = `\n\nRefresh Token: \n${data.refresh_token}`;

        return `${accessToken}${refreshToken}\n\n`;
    }

}

module.exports = SdcService;