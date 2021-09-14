const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`
    type Product{
        id:ID!
        productName:String!
        productPrice: Int!
        productStock: Int!
    }

    type Query{
        product: [Product!]!
    }
                    `

const resolvers = {
    Query: {
        product: async(parents, args) => {
            const product = await Product.findAll();
            return product
        }
    }
}

module.exports = { typeDefs, resolvers }