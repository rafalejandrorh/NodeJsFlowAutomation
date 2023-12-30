const boom = require('@hapi/boom');

const TdpService = require('./tdp.service');
//const tokenIbmRepository = require('../repositories/tokenIBM.repository');

class SdcService {

    constructor(environment) {
        this.environment = environment;
        this.tdpService = new TdpService();
    }

    async updateTokenTdp() {

        let tokenUpdated = '';
        if(this.environment === 'QA') {
            tokenUpdated = await this.tdpService.updateTokenQA();
        }else{
            throw boom.notFound('Environment Not Found');
        }
        console.log('updateTokenTdp tokenUpdated: ', tokenUpdated);

        //await tokenIbmRepository.updateAccessToken(1, data.access_token);
        return tokenUpdated;    
    } 
}

module.exports = SdcService;