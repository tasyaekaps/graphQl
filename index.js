const { ApolloServer } = require("apollo-server");
const {
  importModels,
} = require('./models');
const modules = require('./modules');
const { sequelizeInstance, Sequelize } = require('./config/db');
(async function () {
  try {
   
    const models = importModels(sequelizeInstance, Sequelize);
    const { typeDefs, resolvers } = modules({ models });
  
    
      const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true,
        playground: true,
      });


    server.listen().then(({url}) => {
        console.log(`YOUR API IS RUNNING ON: ${url} `)
    })
  
  } catch (err) {
    console.log(err)
  }
})();




