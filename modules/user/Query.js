const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`
    type User{
        id:ID!
        firstName:String!
        lastName: String!
        username: String!
        password: String!
    }

    type Query{
        users: [User!]!
    }
                    `

const resolvers = {

}

module.exports = { typeDefs, resolvers }