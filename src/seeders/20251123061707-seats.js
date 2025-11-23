'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Seats', [
        {
        airplaneId: 1,
        row: 1,
        column: 'A',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 2,
        column: 'A',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 3,
        column: 'A',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 4,
        column: 'A',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 5,
        column: 'A',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 6,
        column: 'A',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 6,
        column: 'B',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 6,
        column: 'C',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 6,
        column: 'D',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 6,
        column: 'E',
        createdAt:new Date(),
        updatedAt:new Date()
        },
        {
        airplaneId: 1,
        row: 6,
        column: 'F',
        createdAt:new Date(),
        updatedAt:new Date()
        },
      ], {});  
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};
