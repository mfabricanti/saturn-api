'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { as: 'UserPost', foreignKey: 'userId' })
      Post.hasMany(models.Comment, { as: 'PostComment', foreignKey: 'postId' })
      Post.hasMany(models.Like, { as: 'PostLike', foreignKey: 'postId' })
      Post.belongsTo(models.Photo, { as: 'PhotoPost', foreignKey: 'photoId' })
    }
  };

  Post.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    paranoid: true,
  });
  return Post;
};