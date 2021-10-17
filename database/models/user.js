'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { as: 'UserPost', foreignKey: 'userId' })
      User.hasMany(models.Comment, { as: 'UserComment', foreignKey: 'userId' })
      User.hasMany(models.Like, { as: 'UserLike', foreignKey: 'userId' })
      User.belongsTo(models.Photo, { as: 'PhotoUser', foreignKey: 'photoId' })
    }
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
    }
  }, {
    sequelize,
    paranoid: true,
  });

  return User;
};