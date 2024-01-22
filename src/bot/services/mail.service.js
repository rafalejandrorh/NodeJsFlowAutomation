const axios = require('axios');

const { API: { V1: { endpoint : endpointV1 } } } = require('../../../config') 

class MailService {

    constructor() {
    }

    async sendMail(email, data) {

        const { data } = await axios.post(`${endpointV1}/mail/${email}/send`, {
            subject: data.subject,
            html: data.html
        });
        console.log('sendMail: ', data);
        
        return data;
    }

}

module.exports = MailService;