const axios = require('axios');

const config = require('../../../config');
const { DEV, QA, PROD } = config.SDC.TDP.API;
//const tokenIbmRepository = require('../repositories/tokenIBM.repository');

class TdpService {

    constructor() {

    }

    async updateTokenQA() {

        const { data } = await axios.post(QA.url, {
            grant_type: 'password',
            client_id: QA.OAuth2.clientId,
            scope: QA.OAuth2.scope,
            username: QA.OAuth2.username,
            password: QA.OAuth2.password
        }, 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('TdpService updateTokenQa', data);

        //await tokenIbmRepository.updateAccessToken(1, data.access_token);
        return data;    
    } 
}

module.exports = TdpService;