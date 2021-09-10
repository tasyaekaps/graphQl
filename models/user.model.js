'use strict';

const UserScheme = Sequelize => {
  const { DataTypes } = Sequelize;

  return {id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
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
  UserScheme,
  ModelFn: (sequelizeInstance, Sequelize) => {
    const User = sequelizeInstance
      .define('User', OrderScheme(Sequelize), {
        sequelizeInstance,
        tableName: 'users',
        modelName: 'User',
        underscored: true,
        timestamps: false,
        paranoid: true,
      });

    User.associate = models => {
      models.User.hasMany(models.Transaction, {
        foreignKey: 'userId',
        constraints: false,
      });
    };

    return User;
  },
};