const express = require('express');
const app = express();
const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();
const PORT = 8080;

var corsOptions = {
    origin: 'http://127.0.0.1:5501',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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