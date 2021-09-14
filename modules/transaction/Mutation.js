const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`
    input inputTransaction {
        id: ID!
        userId: String!
        transactionAmm: Int!
    }

    type Mutation{
        inputTransaction(input: inputTransaction!): Transaction
    }
                    `

const resolvers = {
    Mutation: {
        inputTransaction: async(parents, args) => {
            const transInput = {
                id: args.input.id,
                userId : args.input.userId,
                transactionAmm : args.input.transactionAmm,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await md.Transaction.create(transInput)

            const tr = await md.Transaction.findOne({
                where: {id: transInput.id},
                include: [{model: md.User}],
            })

            return tr
            
        },
    }
}

module.exports = { typeDefs, resolvers }