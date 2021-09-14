'use strict';

const ProductScheme = Sequelize => {
  const { DataTypes } = Sequelize;

  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productName: {
      type: DataTypes.STRING
    },
    productStock: {
      type: DataTypes.INTEGER
    },
    productPrice: {
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
  ProductScheme,
  ModelFn: (sequelizeInstance, Sequelize) => {
    const Product = sequelizeInstance
      .define('Product', ProductScheme(Sequelize), {
        sequelizeInstance,
        tableName: 'products',
        modelName: 'Product',
        underscored: false,
        timestamps: false,
        paranoid: true,
      });

    Product.associate = models => {
      models.Product.hasMany(models.TransactionsDetail, {
        foreignKey: 'productId',
        constraints: false,
      });
    };

    return Product;
  },
};