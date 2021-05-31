// From https://gist.github.com/tinovyatkin/4316e302d8419186fe3c6af3f26badff

'use strict';

// Promisifies readline.question function using node native `util.promisify`
// readline.question takes one callback that returns the answer, so it need custom promisifying

const readline = require('readline');
const { promisify } = require('util');

readline.Interface.prototype.question[promisify.custom] = function(prompt) {
  return new Promise(resolve =>
    readline.Interface.prototype.question.call(this, prompt, resolve),
  );
};
readline.Interface.prototype.questionAsync = promisify(
  readline.Interface.prototype.question,
);

/* Usage example then: */
(async () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const airportCode = await rl.questionAsync(
      'Enter the airport code for stats: ',
    );
    rl.close();
    console.info('Getting stats for %s...', airportCode);
})();
/* */
