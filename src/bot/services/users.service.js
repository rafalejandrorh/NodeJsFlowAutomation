const Moment = require('moment');
const axios = require('axios');

const { API: { V1: { endpoint : endpointV1 } } } = require('../../../config') 

const User = require('../../API/services/user.service');

class UserService {

    constructor() {
        this.service = new User();
        Moment.locale('es');
    }

    async register(parameters) {
        const { data } = await axios.post(`${endpointV1}/users/`, parameters)
        return data;
    }

}

module.exports = UserService;