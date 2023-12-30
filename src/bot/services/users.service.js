const Moment = require('moment');
const axios = require('axios');

const User = require('../../API/services/user.service');

class UserService {

    constructor() {
        this.service = new User();
        Moment.locale('es');
    }

    async register(parameters) {
        const { data } = await axios.post('http://localhost:6001/api/v1/users/', parameters)
        return data;
    }

}

module.exports = UserService;