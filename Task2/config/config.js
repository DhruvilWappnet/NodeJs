require('dotenv').config(); // Load environment variables

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,
        pool: {
            max: Number(process.env.POOL_MAX),
            min: Number(process.env.POOL_MIN),
            acquire: process.env.POOL_ACQUIRE,
            idle: process.env.POOL_IDLE
        },
        logging:false
    }
    // Add configuration for other environments (e.g., production, testing)
};