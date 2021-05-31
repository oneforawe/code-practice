// From https://nodejs.org/api/util.html#util_util_promisify_custom
// Compare with code here:
// https://gist.github.com/tinovyatkin/4316e302d8419186fe3c6af3f26badff
// which doesn't seem to work.

// Investigate the usage of util / util.promisify / etc.
// Edit below, and make this work for readline.... (?)

const kCustomPromisifiedSymbol = Symbol.for('nodejs.util.promisify.custom');

doSomething[kCustomPromisifiedSymbol] = (foo) => {
  return new Promise((resolve, reject) => {
    doSomething(foo, resolve, reject);
  });
};
