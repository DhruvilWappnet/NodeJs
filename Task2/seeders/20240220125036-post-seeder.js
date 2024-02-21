'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        name: 'Post 1',
        description: 'Description for Post 1',
        status: 'active',
        userId: 1, // Assign the userId based on existing user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Post 2',
        description: 'Description for Post 2',
        status: 'active',
        userId: 2, // Assign the userId based on existing user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more post data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
