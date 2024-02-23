'use strict';

const db = require('../models/index');
const userData = require('../data/users.json');
const validateUser = require('../validators/userValidator');
const Users = db.users;

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const user of userData) {
        validateUser(user);
        await Users.create(user);
      }
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
