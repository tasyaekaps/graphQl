const typeDef = `
  type TransactionDetail {
    product: Product
    productAmm: Int
    totalAmm: Int
  }
`;

const resolver = {}

module.exports = { typeDef, resolver }