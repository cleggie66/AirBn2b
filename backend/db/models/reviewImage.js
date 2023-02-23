'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    
    static associate(models) {
      ReviewImage.belongsTo(models.Review, { foreignKey: "reviewId"});
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isURL: true,
      }
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', "reviewId"]
      }
    }
  });
  return ReviewImage;
};