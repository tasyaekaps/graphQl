const typeDef = `
     type Transaction {
         users: User
         transactionAmm: String!
         transactiondetails: [TransactionDetail]
     }
`;

const resolver = {
    Transaction: {
        users: async (parent, args, context, info) => {
            return {
                id: parent.User.id,
                firstName: parent.User.firstName,
                lastName: parent.User.lastName,
                username: parent.User.username,
                password: parent.User.password
            }
        },
        transactionAmm: async (parent, args, context, info) => {
            return  "Rp " + parent.transactionAmm
        },
        transactiondetails: async (parent, args, context, info) => {
            return parent.TransactionsDetails.map(item => {
                return{
                    product: {
                        id:item.Product.id,
                        productName:item.Product.productName,
                        productPrice:item.Product.productPrice,
                        productStock: item.Product.productStock,
                    }
                }
            })
        }
    }
}

module.exports = { typeDef, resolver }