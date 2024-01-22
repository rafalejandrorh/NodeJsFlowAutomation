const axios = require('axios');

const { gitGuardian: { url, token, pathHealth} } = require('../../../config/');

class GitGuardianService {

    constructor() {
        this.url = url;
        this.pathHealth = pathHealth;
        this.token = token;
        this.contentType = 'application/json';
    }

    async checkTokenHealth() {
        try {
            const { data } = await axios.get(`${this.url}/v1/${this.pathHealth}`, {
                headers: {
                    'Content-Type': this.contentType,
                    'Authorization': `Token ${this.token}`
                }
            });
            console.log('checkTokenHealth', data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = GitGuardianService;