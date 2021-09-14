const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`
    type TransactionDetail{
        product: Product
        productAmm: Int
        totalAmm: Int
    }
`

const resolvers = {
    
}

module.exports = { typeDefs, resolvers }