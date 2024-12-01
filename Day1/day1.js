// read the input file
const fs = require('fs');
const input = fs.readFileSync('sample_input.txt', 'utf8');

// split the input into an array of lines
const lines = input.split('\n');

console.log(lines);
