const typeDef = `
  type User {
    id:ID!
    firstName:String!
    lastName: String!
    username: String!
    password: String!
  }
`

const resolver = {}

module.exports = { typeDef, resolver }