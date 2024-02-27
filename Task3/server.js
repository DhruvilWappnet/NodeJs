const express = require('express');
const mongoose = require('mongoose');
const sessions = require('express-session');
const uuid = require('uuid').v4;

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessions(
    {
        genid: (req) => {
            return uuid(); // Generate unique session IDs
        },
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 300000 // 5 minutes in milliseconds
        }
    }
));

// app.use

const router1 = require('./routes/userRoutes.js');
app.use('/api/user', router1);

const router2 = require('./routes/postRoutes.js');
app.use('/api/post', router2);

app.use('/', (req, res) => {
    res.json({ operation: "main server" });
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})