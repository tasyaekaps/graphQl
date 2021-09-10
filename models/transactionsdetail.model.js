'use strict';

const TransactionsDetailScheme = Sequelize => {
  const { DataTypes } = Sequelize;

  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    transactionId: {
      type: DataTypes.STRING
    },
    productId: {
      type: DataTypes.INTEGER
    },
    productAmm: {
      type: DataTypes.INTEGER
    },
    totalAmm: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  };
};

module.exports = {
  TransactionsDetailScheme,
  ModelFn: (sequelizeInstance, Sequelize) => {
    const TransactionsDetail = sequelizeInstance
      .define('TransactionsDetail', TransactionsDetailScheme(Sequelize), {
        sequelizeInstance,
        tableName: 'transactionsdetails',
        modelName: 'TansactionsDetail',
        underscored: true,
        timestamps: false,
        paranoid: true,
      });

    Order.associate = models => {
      
        models.TransactionDetail.belongsTo(models.Transaction, {
          foreignKey: 'transactionId',
          constraints: false,
        }),
        models.TransactionDetail.belongsTo(models.Product, {
          foreignKey: 'productId',
          constraints: false,
        });
      
    };

    return Order;
  },
};