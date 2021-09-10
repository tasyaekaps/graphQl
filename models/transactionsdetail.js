'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionsdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transactionsdetail.init({
    transactionId: {type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,},
    productId: DataTypes.INTEGER,
    productAmm: DataTypes.INTEGER,
    totalAmm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactionsdetail',
  });
  return transactionsdetail;
};