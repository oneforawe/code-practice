#!/usr/bin/env node
/*
  Filename: functions.js
  Author:   Andrew Forrester
  Web:      https://www.andrew-forrester.com/

  Basic Usage: Execute `node functions.js`


  Note: include...
  function definition
  function declaration
  function statement
  function expression    (optionally named or anonymous)
  anonymous function
  arrow function
  "function constant"?
  "function variable"?
  hoisting / non-hoisting
  IIFE immediately-invoked function expression
  (aka immediately executed function expression)

  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function

  functions that can/cannot be arguments ??? wrong
    ( https://www.youtube.com/watch?v=yo3MJPcVJc8&t=240s )
    ( "...when you want to pass a function to another function, you cannot pass
       [a] function declaration to another function; you have to use a function
       expression because it's a variable.")
    ( I think his claim just doesn't make sense as an assertion.)

*/
const log = console.log

log(function () {})
log(function hello () {})

// Not allowed:
//function () {}  // function declaration statements must name the function


// WORKS:
foo();

function foo() {
  return 5;
}


// ?
foo = function foo() {
  return 5;
}

foo();


// DOESN'T WORK:
foo(); // ReferenceError: foo is not defined

foo = function() {
  return 5;
}
