var bcrypt = require("bcryptjs");
const { importModels } = require('../models');
const { sequelizeInstance, Sequelize } = require('../config/db');
const md = importModels(sequelizeInstance, Sequelize);
const resolvers = {
    Query: {
        product: () => {
            const product = product.findAll();
        },

        transaction: async(parents, args) => {
           const tr =  await md.Transaction.findOne({where:{
                id: args.id
                },
                include: [
                    {model: md.User},
                    {model: md.TransactionsDetail, include:[
                        {model: md.Product}
                    ]}
            ]})

            return {
                users: {
                    id:tr.User.id,
                    firstName:tr.User.firstName,
                    lastName: tr.User.lastName,
                    username: tr.User.username,
                    password: tr.User.password
                },
                transactionAmm: tr.transactionAmm,
                transactiondetails: tr.TransactionsDetails.map(item => {
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

    },
    
    
    Mutation: {
        createUser: async(parents, args) => {
            const user = {
                username: args.input.username,
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                password: bcrypt.hashSync(args.input.password, 8),
                createdAt: new Date(),
                updatedAt: new Date()
            }

            await md.User.create(user);

            

            return user;
        },

        createProduct: async(parents, args) => {
            const product = {
                id: args.input.id,
                productName: args.input.productName,
                productPrice: args.input.productPrice,
                productStock: args.input.productStock,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            await md.Product.create(product)

            return product
        },

        inputTransaction: async(parents, args) => {
            const transInput = {
                id: args.input.id,
                userId : args.input.userId,
                transactionAmm : args.input.transactionAmm,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await md.Transaction.create(transInput)

            const tr = await md.Transaction.findOne({
                where: {id: transInput.id},
                include: [{model: md.User}],
            })

            console.log(tr)
            return {
                users: {
                    id:tr.User.id,
                    firstName:tr.User.firstName,
                    lastName: tr.User.lastName,
                    username: tr.User.username,
                    password: tr.User.password
                },
                transactionAmm: tr.transactionAmm,
                transactiondetails: []
            }
            
        },

        inputTransactionDetail: async(parents, args) => {
            const details = {
                transactionId: args.input.transactionId,
                productId: args.input.productId,
                productAmm: args.input.productAmm,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await md.Product.findOne({
                where:{
                    id: args.input.productId
                },
                raw:true
            }).then((product) => {
                details.totalAmm = details.productAmm * product.productPrice
                
            })

            await md.TransactionsDetail.create(details)

            await md.Transaction.update({
                'transactionAmm':  Sequelize.literal(` transactionAmm + ${details.totalAmm}`)
            },
            {where:{
                id: details.transactionId
            },
            include: [{model: md.User}, {model: md.TransactionsDetail}],},
            )

            const tr = await md.Transaction.findOne({
                where: {
                  id: details.transactionId
                },
                include: [
                  { model: md.User }, 
                  {
                    model: md.TransactionsDetail, 
                    include: [
                        {model: md.Product}
                    ]
                  }
                ],
              });

            
            return {
                users: {
                    id:tr.User.id,
                    firstName:tr.User.firstName,
                    lastName: tr.User.lastName,
                    username: tr.User.username,
                    password: tr.User.password
                },
                transactionAmm: tr.transactionAmm,
                transactiondetails: tr.TransactionsDetails.map(item => {
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

            // console.log(res)
            // return res

            
        },

        deleteProduct: async(parents, args) => {
            await md.Product.destroy({
                where: {
                    id: args.id
                }
            })

            return (await md.product.findAll())
        }

    }
}

module.exports = { resolvers }