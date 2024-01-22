const axios = require('axios');

const { API: { V1: { endpoint : endpointV1 } } } = require('../../../config') 

class MailService {

    constructor() {
    }

    async sendMail(email, dataBody) {

        const { data } = await axios.post(`${endpointV1}/mail/${email}/send`, {
            subject: dataBody.subject,
            html: dataBody.html
        });
        console.log('sendMail: ', data);
        
        return data;
    }

}

module.exports = MailService;