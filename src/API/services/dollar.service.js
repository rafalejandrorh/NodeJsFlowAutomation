const axios = require('axios');

const { exchangeVcoud: { url, pathCoins } } = require('../../../config/');

class DollarService {

    constructor() {
        this.url = url;
        this.pathCoins = pathCoins;
        this.typeBolivarBaseUsd = '?type=bolivar&base=usd';
        this.prices = [
            'VMO',
            'VES',
            'VBIN',
            'VEPAY'
        ];
    }

    async getDollarPrice() {

        let dollarPriceFiltered = [];
        const { data } = await axios.get(`${this.url}${this.pathCoins}/latest${this.typeBolivarBaseUsd}`);
        console.log('dollarPrice', data);
        
        for (let index = 0; index < data.length; index++) {
            let dataIndex = data[index];
            console.log(`dollarPrice name: ${dataIndex.name}`);

            dollarPriceFiltered = [
                ...dollarPriceFiltered, {
                    name: dataIndex.name,
                    symbol: dataIndex.symbol,
                    price: dataIndex.price,
                    priceOld: dataIndex.priceOld,
                    updatedAt: dataIndex.updatedAt
                }
            ]       
        }
        console.log('API.DollarService.getDollarPrice', dollarPriceFiltered);
        return dollarPriceFiltered;        
    } 

    async findOneDollarPrice(source) {

        let dollarPrice = [];
        const { data } = await axios.get(`${this.url}${this.pathCoins}/latest${this.typeBolivarBaseUsd}`);
        console.log('dollarPrice', data);
        
        for (let index = 0; index < data.length; index++) {
            let dataIndex = data[index];
            console.log(`dollarPrice name: ${dataIndex.name}`);
            console.log(`dollarPrice symbol: ${dataIndex.symbol}`);

            if(dataIndex.symbol === source) {
                console.log(`symbol: true`);

                dollarPrice = [
                    ...dollarPrice, {
                        name: dataIndex.name,
                        price: dataIndex.price,
                        priceOld: dataIndex.priceOld,
                        updatedAt: dataIndex.updatedAt
                    }
                ]
            }          
        }
        console.log('findOneDollarPrice', dollarPrice);
        return dollarPrice;        
    } 

    async getDollarPriceAllowed() {

        let dollarPriceFiltered = [];
        const { data } = await axios.get(`${this.url}${this.pathCoins}/latest${this.typeBolivarBaseUsd}`);
        console.log('dollarPrice', data);
        
        for (let index = 0; index < data.length; index++) {
            let dataIndex = data[index];
            console.log(`dollarPrice name: ${dataIndex.name}`);
            dollarPriceFiltered = [
                ...dollarPriceFiltered, {
                    name: dataIndex.name,
                    symbol: dataIndex.symbol,
                }
            ]       
        }
        console.log('dollarPriceFiltered', dollarPriceFiltered);
        return dollarPriceFiltered;        
    } 
}

module.exports = DollarService;