const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();

app.use(express.json()); // converting body into json
app.use('/static', express.static(path.join(__dirname, 'static'))); // static files middleware for accessing file
// app.use((req, res) => res.send('<h1>Hello World</h1>'));

app.get('/', (req, res) => {
    // res.status(200);
    // res.set('Content-Type', 'text/html');
    // console.log(req.body);
    // res.send("Welcome to home.");
    res.sendFile(path.join(__dirname, 'static/102.jpg'));
})

app.post('/', (req, res) => {
    const { name } = req.body;
    // const name  = req.body.name;
    console.log(name);
    // console.log(req.body);
    res.send(`Welcome ${name}`);
})




app.listen(port, (err) => {
    if (!err) {
        console.log("Server is runnig on port:" + port);
    }
    else {
        console.log("Error running the server.");
    }
})