#!/usr/bin/env node
/**
 * Filename:    try-catch.js
 * Author:      Andrew Forrester <andrew@andrew-forrester.com>
 * Code:        JavaScript/ECMAScript
 * Description: Demonstration of the JavaScript try-catch control construction.
 *
 * Notes:       Apparently, curly braces must be used, even though the language
 *              would be consistent if it did not enforce this requirement.
 */

// This is not even tried: it's caught as a SyntaxError before execution.
//try { 1 = 5 }
//catch (err) { console.error(err) }

let variable
console.log(`variable = ${variable}`)

try { variable = 0 }
catch (err) { console.error(err) }
console.log(`variable = ${variable}`)

variable = 1
console.log(`variable = ${variable}`)

variable = 5
console.log(`variable = ${variable}`)
for (let i = 0; i < 1; i++) { variable = 6 }
console.log(`variable = ${variable}`)

