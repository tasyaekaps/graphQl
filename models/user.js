'use strict';

const UserScheme = Sequelize => {
  const { DataTypes } = Sequelize;

  return {id: {
    type: DataTypes.STRING,
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
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    
  }
  };
};

module.exports = {
  UserScheme,
  ModelFn: (sequelizeInstance, Sequelize) => {
    const User = sequelizeInstance
      .define('User', UserScheme(Sequelize), {
        sequelizeInstance,
        tableName: 'Users',
        modelName: 'User',
        underscored: false,
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