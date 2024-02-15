// task: 
//   - create a file (example.txt) in C drive.
//   - your node project in in D drive.
//   - get the file path example.txt.
//   - print the buffer and data of the example.txt file.
//   - write data of the file at D://copyExample.txt.
//   - compress that file and save at <your project location>

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const os = require('os');

const cpath = "C:\\Users\\Dhruvil\\DemoData";
const curpath = "D:\\Wappnet\\Task";
const examplepath = path.join(cpath, 'example.txt');

function createfile() {
    return new Promise((resolve, reject) => {
        var read = fs.createReadStream('data.txt');
        var write = fs.createWriteStream(path.join(cpath, 'example.txt'));
        read.pipe(write);

        write.on('finish', () => {
            console.log('1.------>Write compete and example.txt is made');
            resolve("done");
        });

        write.on('error', (error) => {
            console.error('1.------>An error occurred during creating file:', error);
            reject("error");
        });
    });
}

function getdata() {
    return new Promise((resolve, reject) => {
        fs.readFile(examplepath, (err, data) => {
            if (err) {
                console.log("2.------>Error while reading data.");
                reject("error");
            } else {
                console.log("Buffer data:", data);
                console.log("Data : ", data.toString());
                fs.writeFile(path.join(curpath, 'copyExample.txt'), data, (err) => {
                    if (err) {
                        console.log('2.------>Error while writing data');
                        reject("error");
                    } else {
                        console.log("2.------>Succefully copied data in copyexample.txt");
                        resolve("success");
                    }
                });
            }
        });
    });
}
function compressfile() {
    return new Promise((resolve, reject) => {
        const gzip = zlib.createGzip();
        const reader = fs.createReadStream(examplepath);
        const writer = fs.createWriteStream(path.join(__dirname, "copressed.gz"));
        reader.pipe(gzip).pipe(writer);

        writer.on('finish', () => {
            console.log('3.------>Compression completed.');
            resolve("success");
        });

        writer.on('error', (error) => {
            console.error('3.------>An error occurred during compressing file:', error);
            reject("error");
        });
    });
}


async function runtask() {
    createfile()
        .then(() => {
            return getdata();
        })
        .then(() => {
            return compressfile();
        })
        .then(() => {
            console.log("Success");
        })
        .catch((err) => {
            console.log(err);
        })
    // await getdata();
    // await compressfile();
}

runtask();


// console.log('1');
// const result = fs.readFileSync('data.txt', 'utf-8');
// console.log(result);

// fs.readFile('data.txt', 'utf-8', (err, res) => {
//     console.log(res);
// })

// console.log('2');
// console.log('3');
// console.log('4');

// console.log(os.cpus().length);
// process.env.UV_THREADPOOL_SIZE=4;
