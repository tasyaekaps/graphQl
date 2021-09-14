const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`
    type Transaction{
        users: User
        transactionAmm: String!
        transactiondetails: [TransactionDetail]
    }
`

const resolvers = {
    Query: {
        transaction: async(parents, args) => {
            const tr =  await md.Transaction.findOne({where:{
                 id: args.id
                 },
                 include: [
                     {model: md.User},
                     {model: md.TransactionsDetail, include:[
                         {model: md.Product}
                     ]}
             ]})
 
             return tr;
         }
    }
}

module.exports = { typeDefs, resolvers }