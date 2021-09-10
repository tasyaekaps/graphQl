var bcrypt = require("bcryptjs");
const md = require("../models");
const Sequelize = require('sequelize');

const resolvers = {
    Query: {
        product: () => {
            const product = Product.findAll();
        },

        transaction: async(parents, args) => {
           const resp =  await md.transaction.findOne({where:{
                id: args.id
            },
            include: [
                {model: md.user, as:"users"},
                {model: md.transactiondetail, include:[
                    {model: md.product, as:"product"}
                ], as:"transactiondetails"}
        ],  
            raw:true,
            nest:true})

            console.log(resp)
            return resp
        }

    },
    
    
    Mutation: {
        createUser: async(parents, args) => {
            const user = {
                username: args.input.username,
                firstName: args.input.firstName,
                lastName: args.input.lastName,
                password: bcrypt.hashSync(args.input.password, 8)
            }
            await md.user.create(user);

            return user;
        },

        createProduct: async(parents, args) => {
            const product = args.input
            await md.product.create(product)

            return product
        },

        inputTransaction: async(parents, args) => {
            await md.transaction.create(args.input)

            const tr = await md.transaction.findAll({
                limit:1,
                order: [ [ 'createdAt', 'DESC' ]],
                include: ["users"],
                raw:true,
                nest:true
            })

            return tr[0]
            
        },

        inputTransactionDetail: async(parents, args) => {
            const details = args.input
            await md.product.findOne({
                where:{
                    id: args.input.productId
                },
                raw:true
            }).then((product) => {
                details.totalAmm = details.productAmm * product.productPrice
                
            })

            console.log(details)
            
            await md.transactiondetail.create(details)

            const res = await md.transaction.update({
                'transactionAmm':  Sequelize.literal(` transactionAmm + ${details.totalAmm}`)
            },
            {where:{
                id: details.transactionId
            }}
            )

            
        }

        

    }
}

module.exports = { resolvers }