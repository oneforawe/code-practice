/*
  Filename: node-syntax-highlighting.js
  Author:   Andrew Forrester
  E-mail:   andrew@andrew-forrester.com

  Purpose: Found this example of how to do RIDICULOUSLY MINIMAL syntax
    highlighting in node for a single word on a single line:
    https://stackoverflow.com/questions/63050956/
      how-to-have-syntax-highlighting-of-input-text-in-node-js-repl

  Basic Usage: Enter a Node.js REPL by executing `node` in the shell. Then
    execute `.load node-syntax-highlighting.js` in the REPL to run the file.
    (It also prints out the file in a really messy manner, unfortunately.)
    Then type the word `define` and whever else you like, once.
*/


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("code: ", function(code) {
  console.log('\ncode is ' + code);
  rl.close();
});

// force trigger of _writeToOutput on each keystroke
process.stdin.on('keypress', (c, k) => {
    // setTimeout is needed otherwise if you call console.log
    // it will include the prompt in the output
    setTimeout(() => {
        rl._refreshLine();
    }, 0);
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
    rl.output.write(stringToWrite.replace(/define/g, '\u001b[1;34mdefine\x1b[0m'));
};
