var bcrypt = require("bcryptjs");
const typeDef = `
    input inputUser {
        id: ID!
        username: String!
        firstName: String!
        lastName: String!
        password: String!
    }
    type Mutation {
        createUser(input: inputUser!): User
    }
                    `

const resolver = {
    Mutation: {
        createUser: async(parents, args, context) => {
            const { models } = context;
            
            const user = {
                id: args.input.id,
                username: args.input.username,
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                password: bcrypt.hashSync(args.input.password, 8),
                createdAt: new Date(),
                updatedAt: new Date()
            }

            await models.User.create(user);

            

            return user;
            
        },
    }
}

module.exports = { typeDef, resolver }