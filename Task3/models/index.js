const config = require('../config/config');
const mongoose = require('mongoose');
const User = require('../models/userModel.js')

const { host, port, name } = config.database;
let uri = `mongodb://${host}:${port}/${name}`;

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


const db = {}

db.users = require('./userModel.js');
db.posts = require('./postModel.js');

module.exports = db