const { gql } = require("apollo-server");

const typeDefs = gql`
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

    # type for getting datas
    type Query{
        # show list of user
        users: [User!]! 
        # show single user by an id as param
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    # how graphql retrieve the data, define all the field that wanna be inputted
    input CreateUserInput {
        name:String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL 
        # if the input didnt specified nationaility, the default value is Brazil
    }

    # type for manipulating data
    type Mutation {
        createUser(input: CreateUserInput!): User

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