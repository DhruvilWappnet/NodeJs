// http for allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).

const http = require('http');
const url = require('url');

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write("Yeahh here you are!");
//     res.end('Hello World!');
// }).listen(8080);

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(req.url);
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end("Here is your text: "+txt);
    // res.end();
}).listen(8080);