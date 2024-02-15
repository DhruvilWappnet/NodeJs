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

let content = "Hello Here I am."

fs.writeFile(filename, content, (err) => {
    if (err) throw (err);
    console.log('saved');
})


// fs.unlink(filename, (err) => {
//     if (err) throw err;
//     console.log('File is Deleted!');
// })

fs.rename(filename, 'demofile.txt', (err) => {
    if (err) throw err;
    console.log('File Renamed!');
})

fs.access(filename, constants.F_OK, (err) => {
    console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
});

var data2 = fs.readFileSync(filename);
console.log(data2.toString());

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

let data3 = " Hello added asdfghjkl";

fs.appendFileSync(filename, data3, 'utf-8');
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

fs.truncate(path.join(__dirname, filename), 0, function () {
    console.log('File Content Deleted');
})

let data1 = "";
fs.readFile(filename, "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
})


fs.writeFileSync("newfile.txt", data1, (err) => {
    if (err) throw err;
    console.log("Done");
})


let datanew = fs.readFileSync(filename, 'utf-8');
console.log(datanew);
let complte = fs.writeFileSync('newfile.txt', datanew);
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

//createReadStream method is used to create a readable stream from a file. It reads data from the file in chunks and emits events as the data becomes available. This allows you to process the file's content asynchronously.
//createWriteStream method is used to create a writable stream to a file. It allows you to write data to a file in chunks rather than writing the entire file at once. This is especially useful for writing large amounts of data efficiently.


// reader = fs.createReadStream('input.txt');
// writer = fs.createWriteStream('input.txt');
// writer.write('Hello new data');
// // console.log(reader);

// reader.on('data', function (chunk) {
//     console.log(chunk.toString());
// })

{
    const fs = require('fs');

    // Create a readable stream from a file
    const readStream = fs.createReadStream('NodeJs/input.txt');

    // Event listener for when data is available
    readStream.on('data', (chunk) => {
        console.log('Received chunk of data:');
        console.log(chunk.toString()); // Convert chunk to string and log it
    });

    // Event listener for when the stream ends
    readStream.on('end', () => {
        console.log('Finished reading the file.');
    });

    // Event listener for any errors that occur
    readStream.on('error', (error) => {
        console.error('An error occurred:', error);
    });
}

{
    const fs = require('fs');

    // Create a writable stream to a file
    const writeStream = fs.createWriteStream('input.txt');

    // Write data to the file
    writeStream.write('Hello, ');
    writeStream.write('world!');
    writeStream.end(); // End the stream

    // Event listener for when the writing process is finished
    writeStream.on('finish', () => {
        console.log('Finished writing to the file.');
    });

    // Event listener for any errors that occur
    writeStream.on('error', (error) => {
        console.error('An error occurred:', error);
    });
}

// A pipe simply refers to a temporary software connection between two programs or commands.
// pipe method in Node.js allows you to connect the output of one stream to the input of another stream, effectively creating a pipeline for streaming data from one place to another.

var reader = fs.createReadStream('input.txt');
var writer = fs.createWriteStream('output.txt');
reader.pipe(writer);

// sync blocking
fs.writeFileSync('input.txt', "Hello world");

// async non blocking
fs.writeFile('input.txt', "hello world", (err) => { return err; })

