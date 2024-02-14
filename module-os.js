var os = require('os');

console.log("Plateform:", os.platform());
console.log("Architecture:", os.arch());

// console.log(os.constants);
// console.log(os.cpus());

// // Endianness is the order in which bytes in computer memory are read in a computer's architecture and storage system
console.log(os.endianness());
console.log(os.EOL);

console.log(os.freemem() / (1024 * 1024 * 1024));

console.log(os.hostname())
console.log(os.loadavg()) // 
// console.log(os.networkInterfaces()) // Returns the network interfaces that has a network address

console.log(os.platform());
console.log(os.release());
console.log(os.tmpdir());
console.log(os.totalmem() / (1024 * 1024 * 1024));
console.log(os.type())
console.log(os.uptime())
console.log(os.userInfo())



