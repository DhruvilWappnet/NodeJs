require('dotenv').config(); // Load environment variables from .env file
module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'UserPostDB',
    // username: process.env.DB_USERNAME || '',
    // password: process.env.DB_PASSWORD || '',
  }
};