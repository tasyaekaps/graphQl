const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`
    input InputProduct{
        productName: String!
        productPrice: Int!
        productStock: Int!
    }

    type Mutation{
        createProduct(input: InputProduct!): Product
        deleteProduct(id:ID!) : [Product!]!
    }
                    `

const resolvers = {
    Mutation: {
        createProduct: async(parents, args) => {
            const product = {
                id: args.input.id,
                productName: args.input.productName,
                productPrice: args.input.productPrice,
                productStock: args.input.productStock,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            await md.Product.create(product)

            return product
        },

        deleteProduct: async(parents, args) => {
            await md.Product.destroy({
                where: {
                    id: args.id
                }
            })

            return (await md.product.findAll())
        }
    }
}

module.exports = { typeDefs, resolvers }