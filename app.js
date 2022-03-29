const fs = require('fs');
const HPLInterpreter = require('./HPLInterpreter');

const data = fs.readFileSync('./input.hand', { encoding: 'utf8' });
let output = '';

HPLInterpreter.process(data, (char) => output = output + char)
console.log(output);