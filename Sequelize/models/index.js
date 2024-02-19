const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle

    }
}
)

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

const Student = sequelize.define('student', {
    rollno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    degree: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
})

db.student = Student;

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })


module.exports = db