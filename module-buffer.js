// The buffers module provides a way of handling streams of binary data.


var buf = Buffer.from('abcdef');
console.log(buf.slice(0).toString());
console.log(buf.toJSON());

var abuf = new Buffer([16, 32, 48, 64]);
console.log(abuf);

var buf2 = Buffer.alloc(20);
console.log(buf2);
let ans=buf2.write("Hello I am dhruvil");
console.log(ans);
console.log(buf2.toString());

let buf = Buffer.alloc(26);
for (var i = 0, j = 65; i < 26, j < 90; i++, j++) {
    buf[i] = j;
}
console.log(buf.toString('utf-8', 3, 9));

let buf1 = Buffer.from("Hello");
let buf2 = Buffer.from("I am from Mehsana");

buf1.copy(buf2, 4, 0);
console.log(buf2.toString());

console.log(buf2.includes("Mehsana"));

const op = Buffer.compare(buf2, buf1);
console.log(op);
console.log(buf1.equals(buf2));

var buf4 = Buffer.alloc(5, 10);
console.log(buf4);

var buf4 = Buffer.from("Hello i am dhruvil", 'utf-8');
console.log(buf4);
cropped_buf = buf4.subarray(5, 10);
console.log("Cropped buffer is: " + cropped_buf);
cropped_buf[0] = 70;  // F
cropped_buf[1] = 79;  // O
cropped_buf[2] = 82;  // R 
console.log("Cropped buffer after modification is: " + cropped_buf);
console.log("Original buffer after modification is: " + buf4);


var buf = Buffer.from('GeeksforGeeks');
buf.write('EE', 1);
console.log(buf.toString());

const buffer = Buffer.from(
    'GeeksforGeeks: A computer science portal');
const output = buffer.indexOf('computer');
console.log(output); 

const buf = Buffer.from([0x4, 0x0, 0x1, 0x1, 0x4, 0x5, 0x4, 0x6]);
console.log(buf.toString());
buf.swap32();
console.log(buf.toString());

console.log(Buffer.isEncoding('utf8'));
console.log(Buffer.isEncoding('utf16le'));
console.log(Buffer.isEncoding('ascii'));
console.log(Buffer.isEncoding('asciivalue'));
console.log(Buffer.isEncoding('base64'));
console.log(Buffer.isEncoding('basename'));

