'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, { as: 'UserLike', foreignKey: 'userId' })
      Like.belongsTo(models.Post, { as: 'PostLike', foreignKey: 'postId' })
      Like.belongsTo(models.Comment, { as: 'CommentLike', foreignKey: 'commentId' })
    }
  };

  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    commentId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    paranoid: true,
  });
  return Like;
};