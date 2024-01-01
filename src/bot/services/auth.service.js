const Moment = require('moment');
const axios = require('axios');

const { API: { V1: { endpoint : endpointV1 } } } = require('../../../config') 

const User = require('../../API/services/user.service');

class UserService {

    constructor() {
        this.service = new User();
        Moment.locale('es');
    }

    async login(data) {
        try {

            const user = await axios.post(`${endpointV1}/auth/login`, data);
            //   .then(function (response) {
            //     console.log(response);
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            console.log(`result Service register: ${user}`);
    
            return user;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UserService;