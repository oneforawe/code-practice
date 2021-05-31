#!/usr/bin/env node
/*
  Filename: statements-and-expressions.js
  Author:   Andrew Forrester
  E-mail:   andrew@andrew-forrester.com

  Basic Usage: Execute `node functions.js`


*/
const log = console.log

let j
let i = (j = 0)
// Is this a "compound statement" or a "simple statement"?
// Perhaps this is just ambiguous..
// Although `j = 0` could be a statement (if on a line of its own, with or
//  without a semicolon... though maybe the semicolon is implied for every/most
//  statements), it is being used as an expression here.
// Is `let j` an expression AND a statement?  Or is it just a statement?
//  Does it evaluate to `undefined`?  Or does it not evaluate at all?

// Not allowed:
//let k = (let m = 0)

log(`i = ${i}, j = ${j}`)

i = j = 1
log(`i = ${i}, j = ${j}`)

// This doesn't *do* anything, really.
// It's a statement that doesn't do anything and also isn't an empty statement:
5;
5+5;

// Not allowed:
//console.log({5;})