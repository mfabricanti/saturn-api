'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.hasOne(models.User, { as: 'PhotoUser', foreignKey: 'photoId' })
      Photo.hasOne(models.Post, { as: 'PhotoPost', foreignKey: 'photoId' })
    }
  };

  Photo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    photo: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    paranoid: true,
  });
  return Photo;
};