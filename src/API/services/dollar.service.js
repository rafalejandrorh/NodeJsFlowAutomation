const axios = require('axios');

const inArray = require('../utils/tools/inArray');

class DollarService {

    constructor() {
        this.prices = [
            'VMO',
            'VES',
            'VBIN',
            'VEPAY'
        ];
    }

    async getDollarPrice() {

        let dollarPriceFiltered = [];
        const { data } = await axios.get('https://exchange.vcoud.com/coins/latest?type=bolivar&base=usd');
        console.log('dollarPrice', data);
        
        for (let index = 0; index < data.length; index++) {
            let dataIndex = data[index];
            console.log(`dollarPrice name: ${dataIndex.name}`);

            if(inArray(dataIndex.symbol, this.prices)) {
                console.log(`inArray: true`);

                dollarPriceFiltered = [
                    ...dollarPriceFiltered, {
                        name: dataIndex.name,
                        price: dataIndex.price,
                        priceOld: dataIndex.priceOld,
                        updatedAt: dataIndex.updatedAt
                    }
                ]
            }          
        }
        console.log('dollarPriceFiltered', dollarPriceFiltered);
        return dollarPriceFiltered;        
    } 
}

module.exports = DollarService;