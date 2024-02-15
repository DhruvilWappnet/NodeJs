// Zlip is a module used in Node.js to compress or decompress a file. Compression means zip the file and decompression means unzip the file. 

// createGzip() method of the Zlib module to create a zip file or compressed file
// we are going to pipe the method with the file we want to compress while creating an output file as a result of createGzip()

var zlib = require('zlib');
var fs = require('fs');
var path = require('path');

const inputpath = path.join(__dirname, 'input.txt');
// // stream.pipe(destination[, options]): Method to pipe data from a readable stream to a writable stream.

// var gzip = zlib.createGzip();
// var r = fs.createReadStream('demofile.txt');
// var w = fs.createWriteStream('./mygzipfile.txt.gz');
// r.pipe(gzip).pipe(w);
// read from r file, compress using gzip , than writing compressed to w

// {
//     var gzip = zlib.createGzip();
//     var r = fs.createReadStream('input.txt');
//     var w = fs.createWriteStream('mygzipfile.txt.gz');
//     r.pipe(gzip).pipe(w);
// }

// {
//     var unzip = zlib.createUnzip();
//     var input = fs.createReadStream('mygzipfile.txt.gz');
//     var output = fs.createWriteStream('output2.txt');
//     input.pipe(unzip).pipe(output);
// }

// // zlib constants
// console.log(zlib.constants.Z_BEST_SPEED)

// zlib.createBrotliCompress() --  Brotli is a modern compression algorithm developed by Google, known for its high compression ratio and efficient compression speed.
// {
//     const read = fs.createReadStream(inputpath);
//     const write = fs.createWriteStream('output.br');
//     const brot = zlib.createBrotliCompress();
//     read.pipe(brot).pipe(write);

//     write.on('finish', () => {
//         console.log('Finished compressing the file using Brotli.');
//     })
//     write.on('error', (error) => {
//         console.error('An error occurred during compression:', error);
//     });
// }
// {
//     const read = fs.createReadStream('output.br');
//     const write = fs.createWriteStream('decompressed.txt');
//     const brot = zlib.createBrotliDecompress();
//     read.pipe(brot).pipe(write);
//     write.on('finish', () => {
//         console.log('Finished decompressing the file using Brotli.');
//     });

//     write.on('error', (error) => {
//         console.error('An error occurred during decompression:', error);
//     });
// }

// Deflate is a widely used compression algorithm, typically used within formats such as ZIP files and HTTP compression.
// {
//     const read = fs.createReadStream(inputpath);
//     const write = fs.createWriteStream('compressed.deflate');
//     const brot = zlib.createDeflateRaw();
//     read.pipe(brot).pipe(write);
// }
// {
//     const read = fs.createReadStream('compressed.deflate');
//     const write = fs.createWriteStream('decompress.txt');
//     const brot = zlib.createInflateRaw();
//     read.pipe(brot).pipe(write);
// }

// compress and decompress data that has been compressed using the Gzip compression algorithm,
// {
//     const compressedFilePath = 'input.txt';
//     const decompressedFilePath = 'decompressed.gz';
//     const readStream = fs.createReadStream(compressedFilePath);
//     const writeStream = fs.createWriteStream(decompressedFilePath);
//     const gunzipStream = zlib.createGzip();
//     readStream.pipe(gunzipStream).pipe(writeStream);

// }
// {
//     const compressedFilePath = 'decompressed.gz';
//     const decompressedFilePath = 'output.txt';
//     const readStream = fs.createReadStream(compressedFilePath);
//     const writeStream = fs.createWriteStream(decompressedFilePath);
//     const gunzipStream = zlib.createGunzip();
//     readStream.pipe(gunzipStream).pipe(writeStream);
// }