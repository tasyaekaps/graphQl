const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs")
const { resolvers } = require("./schema/resolvers")


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });

server.listen().then(({url}) => {
    console.log(`YOUR API IS RUNNING ON: ${url} `)
})


