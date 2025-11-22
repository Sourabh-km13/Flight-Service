'use strict';
const { Deferrable } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */

const { Enums } = require('../utils/common');
const {Business,PremiumEconomy,Economy,FirstClass} = Enums.seatEnum
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Airplanes',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      column: {
        type: Sequelize.STRING,
        allowNull:false
      },
      type: {
        type: Sequelize.ENUM,
        allowNull:false,
        values:[Business,PremiumEconomy,Economy,FirstClass],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};