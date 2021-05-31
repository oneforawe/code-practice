// From https://www.npmjs.com/package/readline-promise
// Modified.


import require from 'requirejs'

//import readline from 'readline-promise';
const readlinePromise = require('readline-promise').default

const rlp = readlinePromise.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

let bar = null

rlp.questionAsync('Foo?').then(answer => {
  rlp.close()
  bar = answer;
  console.log(bar)
});
