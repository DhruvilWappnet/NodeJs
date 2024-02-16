const process = require('node:process');

// Accessing command-line arguments
// console.log('Command-line arguments:', process.argv);

// Getting the current working directory
// console.log('Current working directory:', process.cwd());

// Getting environment variables
// console.log('Environment variables:', process.env);

// Exiting the process with a specific exit code
// process.exit(0); // Exit with success code

// Listening for process termination events
process.on('exit', (code) => {
    console.log(`Process exited with code ${code}`);
});

function customMethod() {
    console.log('Custom method invoked');
}
// Add the custom method to the process object's prototype
process.__proto__.customMethod = customMethod;
// Now you can use the custom method anywhere in your code
process.customMethod();

