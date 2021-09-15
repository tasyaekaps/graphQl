const typeDef = `
    input inputTransaction {
        id: ID!
        userId: String!
        transactionAmm: Int!
    }
    type Mutation {
        inputTransaction(input: inputTransaction!): Transaction
    }
                    `

const resolver = {
    Mutation: {
        inputTransaction: async(parent, args, context) => {

            const { models } = context;
            
            const transInput = {
                id: args.input.id,
                userId : args.input.userId,
                transactionAmm : args.input.transactionAmm,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await models.Transaction.create(transInput)

            const tr = await models.Transaction.findOne({
                where: {id: transInput.id},
                include: [{model: models.User}],
            })

            return tr
            
            
        },
    }
}

module.exports = { typeDef, resolver }