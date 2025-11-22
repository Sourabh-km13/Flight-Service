'use strict';
const {
  Model
} = require('sequelize');
const { Enums } = require('../utils/common');
const {Business,PremiumEconomy,Economy,FirstClass} = Enums.seatEnum

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId'
      })
    }
  }
  Seat.init({
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    row: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    column: {
      type:DataTypes.STRING,
      allowNull:false
    },
    type: {
      type: DataTypes.ENUM,
      values:[Business,PremiumEconomy,Economy,FirstClass],
      defaultValue:Economy,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};