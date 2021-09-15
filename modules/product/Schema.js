const typeDef = `
  type Product {
    id:ID!
    productName:String!
    productPrice: Int!
    productStock: Int!
  }
`

const resolver = {
    
}

module.exports = { typeDef, resolver }