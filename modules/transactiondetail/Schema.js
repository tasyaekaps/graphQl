const { gql } = require("apollo-server")
const { importModels } = require('../models');
const md = importModels(sequelizeInstance, Sequelize);

const typeDefs = gql`

`

const resolvers = {

}

module.exports = { typeDefs, resolvers }