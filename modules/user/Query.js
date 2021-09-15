const typeDef = `
    type Query {
        users: [User!]!
    }
`

const resolver = {}

module.exports = { typeDef, resolver }