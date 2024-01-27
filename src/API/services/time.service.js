require('moment-timezone');
const Moment = require('moment');

const { gitGuardian: { url, token, pathHealth} } = require('../../../config/');

class TimeService {

    constructor() {
        Moment.locale('es');
        this.timezones = url;
    }

    async getCountriesCodes() {
        try {
            return {
                countries: {
                    codes: Moment.tz.countries()
                }
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getTimezoneCodes(country = null) {
        try {
            let timezoneCodes = {};

            if(country !== null) {
                timezoneCodes = Moment.tz.zonesForCountry(country);
            }else{
                timezoneCodes = Moment.tz.names();
            }
            console.log('getTimezoneCodes: ', timezoneCodes);

            return {
                timezones: timezoneCodes
            };
        } catch (error) {
            
        }
    }

    async getTime(timezone = null) {
        try {
            let time = Moment.tz(timezone).format('dddd, MMMM Do YYYY, h:mm:ss a');
            console.log('getTime:', time);
            return {
                time: time
            };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TimeService;