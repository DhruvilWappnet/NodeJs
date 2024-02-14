// Common use for the File System module:
// Read files -- fs.readFile()
// Create files -- fs.appendFile() , fs.open() , fs.writeFile()
// Update files -- fs.appendFile(),fs.writeFile()
// Delete files -- fs.unlink()
// Rename files

const { constants } = require('buffer');
const { error } = require('console');
const fs = require('fs');
const path = require('path');

let filename = './demofile.txt'

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
});

fs.appendFile('./demofile.txt', 'hello from code', function (err) {
    if (err) throw err;
    console.log("Saved");
})

fs.open(filename, 'w', function (err, file) {
    if (err) throw err;
    console.log('saved');
})

let content="Hello Here I am."

fs.writeFile(filename,content,(err)=>{
    if(err) throw(err);
    console.log('saved');
})


fs.unlink(filename, (err) => {
    if (err) throw err;
    console.log('File is Deleted!');
})

fs.rename(filename, 'demofile.txt', (err) => {
    if (err) throw err;
    console.log('File Renamed!');
})

fs.access(filename, constants.F_OK, (err) => {
    console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
});

var data = fs.readFileSync(filename);
console.log(data.toString());

var buf = new Buffer.alloc(1024);

fs.open(filename, 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("File opened succesfully.");

    fs.read(fd, buf, 0, buf.length, 0, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log(data + " bytes read.");
        if (data > 0) {
            console.log(buf.slice(0, data).toString());
        }
    })

    fs.close(fd, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("File closed successfully.");
    })
})

let data = " Hello added";

fs.appendFileSync(filename, data, 'utf-8');
console.log("Data is appended");

fs.exists(filename, (exists) => {
    console.log(exists ? 'Found' : 'Not Found!');
});

let find = fs.existsSync(filename);
console.log("File is :", find);

function getCurrentFilenames() {
    console.log("\nCurrent filenames:");
    fs.readdirSync(__dirname).forEach(file => {
        console.log(file);
    });
    console.log("\n");
}

getCurrentFilenames();

fs.mkdir(path.join(__dirname, 'test'), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
})

console.log(path.join(__filename, 'test'));

fs.truncate(path.join(__dirname, filename),0, function () {
    console.log('File Content Deleted');
})

let data1="";
fs.readFile(filename,"utf-8",(err,data)=>{
    if (err) throw err;
    console.log(data);
})


fs.writeFileSync("newfile.txt",data1,(err)=>{
    if(err) throw err;
    console.log("Done");
})


let datanew=fs.readFileSync(filename,'utf-8');
console.log(datanew);
let complte=fs.writeFileSync('newfile.txt',datanew);
console.log(complte);

fs.rmdir(path.join(__dirname, 'test'), () => {
    console.log("Folder is deleted.");
})

fs.stat(__dirname, (err, stats) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(stats);
        console.log("Path is file:", stats.isFile()); 
        console.log("Path is directory:", stats.isDirectory()); 
    }
})