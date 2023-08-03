import fs from 'fs';

// write to a file
fs.writeFileSync('./2-basic/hello.txt', 'Hello from node js');

// read from a file
const data = fs.readFileSync('./2-basic/hello.txt', 'utf-8');
console.log(data);
