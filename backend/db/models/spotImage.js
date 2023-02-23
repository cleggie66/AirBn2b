'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {

    static associate(models) {
      SpotImage.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  };
  
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isURL: true,
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', "spotId"]
      }
    },
    scopes: {
      showAll: {
        attributes: {
          exclude: []
        }
      }
    }
  });
  return SpotImage;
};