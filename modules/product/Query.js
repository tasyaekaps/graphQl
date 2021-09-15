const typeDef = `
  type Query {
    product: [Product!]!
  }
`

const resolver = {
    Query: {
        product: async(parents, args, context) => {
            const { models } = context;
            const product = await models.Product.findAll();
            return product
            
        }
    }
}

module.exports = { typeDef, resolver }