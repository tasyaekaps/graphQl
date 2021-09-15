  
const typeDef = `
type Query {
    transactionDetail(id: ID!): TransactionDetail
  }
`

const resolver = {}

module.exports = { typeDef, resolver }