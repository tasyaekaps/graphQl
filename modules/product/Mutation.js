const typeDef = `
    input InputProduct {
        productName: String!
        productPrice: Int!
        productStock: Int!
    }
    type Mutation {
        createProduct(input: InputProduct!): Product
        deleteProduct(id:ID!) : [Product!]!
    }
`

const resolver = {
    Mutation: {
        createProduct: async(parents, args, context) => {
            const { models } = context;

            const product = {
                id: args.input.id,
                productName: args.input.productName,
                productPrice: args.input.productPrice,
                productStock: args.input.productStock,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            await models.Product.create(product)

            return product
            
        },

        deleteProduct: async(parent, args, context) => {
            const { models } = context;

            await models.Product.destroy({
                where: {
                    id: args.id
                }
            })

            return (await models.product.findAll())
            
        }
    }
}

module.exports = { typeDef, resolver }