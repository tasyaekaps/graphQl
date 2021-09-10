const { DataSource } = require('apollo-datasource');

class transactionsAPI extends DataSource {
    constructor({ models }) {
        super();
        this.models = models;
      }
    
      initialize(config) {
        this.context = config.context;
      }

    async saveProduct(input){
        const product = input
        await models.product.create(product)

        return product
    }

    


}

module.exports = transactionsAPI
