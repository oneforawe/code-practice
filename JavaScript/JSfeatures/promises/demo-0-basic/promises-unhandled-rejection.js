#!/usr/bin/env node
/**
 * Filename: promises-unhandled-rejection.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester <andrew@andrew-forrester.com>
 *
 * Basic Usage: Execute in a shell `node promises-unhandled-rejection.js`
 */


let promiseBreaker =
  new Promise((resolve, reject) => {
    setTimeout(() => { reject('The promise was rejected/broken.') }, 1500)
  })
