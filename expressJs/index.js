const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();

// app.use((req, res) => res.send('<h1>Hello World</h1>'));  // middleware are checked and executed one by one
app.use(express.json()); // converting body into json payload
app.use('/static', express.static(path.join(__dirname, 'static'))); // static files middleware for accessing file
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: false }));
app.use(express.text());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]  --  ${req.method} <-> ${req.url}`);
    next();
})


app.get('/', (req, res) => {
    // res.status(200);
    // res.set('Content-Type', 'text/html');
    // console.log(req.body);
    // res.send("Welcome to home.");
    res.sendFile(path.join(__dirname, 'static/102.jpg'));
})

app.get('/home', (req, res) => {
    res.render('home.ejs');
})

app.post('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    const { name } = req.body;
    // const name  = req.body.name;
    console.log(name);
    console.log(req.body);
    res.send(`Welcome ${name}`);
})

// routing 
const test = require('./route/test.js');
const exp = require('constants');
app.use('/test', test);

// Multiple routing
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

router1.get('/user', function (req, res, next) {
    console.log("User Router Working");
    res.end();
});
router2.get('/admin', function (req, res, next) {
    console.log("Admin Router Working");
    res.end();
});

router3.get('/student', function (req, res, next) {
    console.log("Student Router Working");
    res.end();
});

app.use(router1);
app.use(router2);
app.use(router3);


// middleware implemetation

app.post('/middle', (req, res, next) => {
    const { name } = req.body;
    console.log(name);
    res.send("This is post request for " + name);
    next();
})

app.get('/middle', (req, res, next) => {
    const { name } = req.body;
    console.log(req.body);
    res.send("this is get request for " + name);
    res.end();
})


app.listen(port, (err) => {
    if (!err) {
        console.log("Server is runnig on port:" + port);
    }
    else {
        console.log("Error running the server.");
    }
})