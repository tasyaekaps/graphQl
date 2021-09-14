const { gql } = require("apollo-server")

const typeDefs = gql`
    # type Product{
    #     id:ID!
    #     productName:String!
    #     productPrice: Int!
    #     productStock: Int!
    # }

    # type User{
    #     id:ID!
    #     firstName:String!
    #     lastName: String!
    #     username: String!
    #     password: String!
    # }

    # type TransactionDetail{
    #     product: Product
    #     productAmm: Int
    #     totalAmm: Int
    # }

    # type Transaction{
    #     users: User
    #     transactionAmm: String!
    #     transactiondetails: [TransactionDetail]
    # }

    type Query{
        # users: [User!]!
        # transactions: [Transaction!]!
        # product: [Product!]!
        # transaction(id: ID!) : Transaction!
    }

    # input InputProduct{
    #     productName: String!
    #     productPrice: Int!
    #     productStock: Int!
    # }

    # input inputUser {
    #     id: ID!
    #     username: String!
    #     firstName: String!
    #     lastName: String!
    #     password: String!
    # }

    # input inputTransaction {
    #     id: ID!
    #     userId: String!
    #     transactionAmm: Int!
    # }

    # input inputTransactionDetails {
    #     productId: Int!
    #     transactionId: String!
    #     productAmm: Int!
    # }

    type Mutation{
        # createProduct(input: InputProduct!): Product
        # createUser(input: inputUser!): User
        # inputTransaction(input: inputTransaction!): Transaction
        # inputTransactionDetail(input: inputTransactionDetails!): Transaction
        # deleteProduct(id:ID!) : [Product!]!
    }


`

module.exports = { typeDefs }