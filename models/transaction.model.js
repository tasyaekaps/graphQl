'use strict';

const TransactionScheme = Sequelize => {
  const { DataTypes } = Sequelize;
    
  return {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING
    },
    transactionAmm: {
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
  TransactionScheme,
  ModelFn: (sequelizeInstance, Sequelize) => {
    const Transaction = sequelizeInstance
      .define('Transaction', OrderScheme(Sequelize), {
        sequelizeInstance,
        tableName: 'transactions',
        modelName: 'Transaction',
        underscored: true,
        timestamps: false,
        paranoid: true,
      });

    Transaction.associate = models => {
      models.Transaction.hasMany(models.TransactionsDetail, {
        foreignKey: 'transactionId',
        constraints: false,
      });
      models.Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        constraints: false,
      });
    };

    return Transaction;
  },
};