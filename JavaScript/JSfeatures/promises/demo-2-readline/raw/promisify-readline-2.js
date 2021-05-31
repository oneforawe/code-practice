// From https://gist.github.com/tinovyatkin/4316e302d8419186fe3c6af3f26badff

const readline = require('readline');
const { promisify } = require('util');
const readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

// Prepare readline.question for promisification
readline.question[util.promisify.custom] = (question) => {
  return new Promise((resolve) => {
    readline.question(question, resolve);
  });
};

// Usage example:
const answer = await promisify(readline.question)('What is your name? ');
readline.close();
console.log('Hi %s!', answer);
