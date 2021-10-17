'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { as: 'UserComment', foreignKey: 'userId' })
      Comment.belongsTo(models.Post, { as: 'PostComment', foreignKey: 'postId' })
      Comment.hasMany(models.Like, { as: 'CommentLike', foreignKey: 'commentId' })
    }
  };

  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: DataTypes.STRING(500),
  }, {
    sequelize,
    paranoid: true,
  });
  return Comment;
};