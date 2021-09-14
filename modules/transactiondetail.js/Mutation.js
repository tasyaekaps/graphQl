const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`
    input inputTransactionDetails {
        productId: Int!
        transactionId: String!
        productAmm: Int!
    }

    type Mutation{
        inputTransactionDetail(input: inputTransactionDetails!): Transaction
    }
                    `

const resolvers = {
    Mutation: {
        inputTransactionDetail: async(parents, args) => {
            const details = {
                transactionId: args.input.transactionId,
                productId: args.input.productId,
                productAmm: args.input.productAmm,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await md.Product.findOne({
                where:{
                    id: args.input.productId
                },
                raw:true
            }).then((product) => {
                details.totalAmm = details.productAmm * product.productPrice
                
            })

            await md.TransactionsDetail.create(details)

            await md.Transaction.update({
                'transactionAmm':  Sequelize.literal(` transactionAmm + ${details.totalAmm}`)
            },
            {where:{
                id: details.transactionId
            },
            include: [{model: md.User}, {model: md.TransactionsDetail}],},
            )

            const tr = await md.Transaction.findOne({
                where: {
                  id: details.transactionId
                },
                include: [
                  { model: md.User }, 
                  {
                    model: md.TransactionsDetail, 
                    include: [
                        {model: md.Product}
                    ]
                  }
                ],
              });

            
            return tr;

            
        },
    }
}

module.exports = { typeDefs, resolvers }