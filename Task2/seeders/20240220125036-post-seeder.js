'use strict';

const db=require('../models/index');
const postData=require('../data/posts.json');
const validatePost = require('../validators/postValidator');
const Posts=db.posts;


module.exports = {
  async up() {
    try {
      for (const post of postData) {
        // validatePost(post);
        await Posts.create(post);
      }
    } catch (error) {
      console.error('Error seeding posts:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
