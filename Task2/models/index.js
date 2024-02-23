'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.development);
// require('dotenv').config();


sequelize.authenticate()
.then(() => {
    console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

    
const db = {}


db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./userModel.js')(sequelize, DataTypes);
db.posts = require('./postModel.js')(sequelize, DataTypes);

db.users.hasMany(db.posts, { as: 'postDetails', foreignKey: 'userId' });
db.posts.belongsTo(db.users, { as: 'userDetails', foreignKey: 'userId' });

module.exports = db
    


    
    
// const fs = require('fs');
// const path = require('path');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
    
    
    
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DIALECT,
//         operatorsAliases: false,

//         pool: {
//             max: Number(process.env.POOL_MAX),
//             min: Number(process.env.POOL_MIN),
//             acquire: process.env.POOL_ACQUIRE,
//             idle: process.env.POOL_IDLE

//         }
//         // logging: false
//     }
// );
    
    









// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// console.log(process.env.DB_USER);

// const sequelize = new Sequelize();

// fs
//     .readdirSync(__dirname)
//     .filter(file => {
//         return (
//             file.indexOf('.') !== 0 &&
//             file !== basename &&
//             file.slice(-3) === '.js' &&
//             file.indexOf('.test.js') === -1
//         );
//     })
//     .forEach(file => {
//         const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//         db[model.name] = model;
//     });

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
