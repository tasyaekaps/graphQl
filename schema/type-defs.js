const { gql } = require("apollo-server");

const typeDefs = gql`
    # define all the 
    type User{
        id: ID!
        name:String!
        username: String!
        age: Int!
        nationality: String!
        friends: [User]
        favoriteMovie: [Movie]

    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query{
        # show list of user
        users: [User!]! 
        # show single user by an id as param
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    enum Nationality{
        # all the posibble nationality to a user if 1 data is not following the rule. an error appear
        CANADA,
        CHILE,
        BRAZIL,
        INDIA,
        GERMANY
    }
`

module.exports = { typeDefs }