const typeDef = `
    input inputTransactionDetails {
        productId: Int!
        transactionId: String!
        productAmm: Int!
    }
    type Mutation {
        inputTransactionDetail(input: inputTransactionDetails!): Transaction
    }
                    `

const resolver = {
    Mutation: {
        inputTransactionDetail: async(parents, args, context) => {
            const { models } = context;

            
            const details = {
                transactionId: args.input.transactionId,
                productId: args.input.productId,
                productAmm: args.input.productAmm,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await models.Product.findOne({
                where:{
                    id: args.input.productId
                },
                raw:true
            }).then((product) => {
                details.totalAmm = details.productAmm * product.productPrice
                
            })

            await models.TransactionsDetail.create(details)

            await models.Transaction.update({
                'transactionAmm':  Sequelize.literal(` transactionAmm + ${details.totalAmm}`)
            },
            {where:{
                id: details.transactionId
            },
            include: [{model: models.User}, {model: models.TransactionsDetail}],},
            )

            const tr = await models.Transaction.findOne({
                where: {
                  id: details.transactionId
                },
                include: [
                  { model: models.User }, 
                  {
                    model: models.TransactionsDetail, 
                    include: [
                        {model: models.Product}
                    ]
                  }
                ],
              });

            
            return tr;
            
            
        },
    }
}

module.exports = { typeDef, resolver }