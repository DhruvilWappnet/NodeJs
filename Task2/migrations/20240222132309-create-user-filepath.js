'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'filepath', {
      type: Sequelize.JSON,
      allowNull: true
    })
  },  
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'filepath');
  }
};
