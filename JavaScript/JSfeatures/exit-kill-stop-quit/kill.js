#!/usr/bin/env node
/*
 * Filename: kill.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester
 * Web:      https://www.andrew-forrester.com/
 *
 * Basic Usage: Execute in a shell `node kill.js`
 *
 * Reference: https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program
*/

console.log('The program/process is running.')
console.log('Note that when killed, the process will return an exit code of 143, which will (in some contexts) yield error messages.')

process.kill(process.pid, 'SIGTERM')
