// The Path module provides a way of working with directories and file paths.

// Returns the last part of a path
var path = require('path');
var curpath = 'C:\\Users\\Dhruvil\\Desktop\\Wappnet\\NodeJs\\module-http.js';
var filename = path.basename(curpath)
console.log(filename);

// Returns the delimiter specified for the platform
console.log(path.delimiter);

// return directories of path
var dirname = path.dirname(curpath);
console.log(dirname);

// return file extension of a path
var ext = path.extname(curpath);
console.log(ext);

// Formats a path object into a path string
var obj = { dir: 'C:\\user\\Dhruvil', base: 'demofile.txt' }
var p = path.format(obj);
console.log(p);

// Returns true if a path is an absolute path, otherwise false
console.log(path.isAbsolute(curpath));
console.log(path.isAbsolute('test/demo_path.js'));
console.log(path.isAbsolute('\\test\\demo_path.js'));

// Joins the specified paths into one 
var newpath = path.join('C:', 'user', 'dhruvil', 'demo2.txt')
console.log(newpath);

var newpath2 = path.join('C:', 'user', 'dhruvil', '..', 'new.txt');
console.log(newpath2);

// The path.normalize() method resolves the specified path, fixing '..','\\\\' etc.
var x = 'Users/Refsnes/../Jackson';
x = path.normalize(x);
console.log(x)

// Formats a path string into a path object
var obj1 = path.parse(curpath);
console.log(obj1);

// Returns the relative path from one specified path to another specified path

path1 = path.relative("x/hello", "hello/new/b.js");
console.log(path1);

// Resolves the specified paths into an absolute path

path1 = path.resolve("users/admin/asdfg", "readme.md");
console.log(path1)

let changepath = '/users/admin';
path4 = path.resolve(changepath, "text.txt");
console.log(path4);


