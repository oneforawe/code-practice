#!/usr/bin/env node
/*
 * Filename: promises-demo.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester <andrew@andrew-forrester.com>
 *
 * Basic Usage: Execute in a shell `node promises-demo.js`
*/

import chalk from 'chalk'
//const chalk = require('chalk')

const log = console.log
const code = (input) => log(chalk.yellow(input))


const inOrderDemo = async () => {

  log("Let's use a promise, with two different syntaxes...\n")

  // const promiseTimeout = new Promise((resolve, reject) => {
  //     setTimeout(() => { resolve(10) }, 3000)
  // })

  const FuncForPromiseTimeout = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(10) }, 3000)
    })
  }

  log("First let's see the code explicitly creating a promise:")
  code('  const FuncForPromiseTimeout = () => {')
  code('    return new Promise((resolve, reject) => {')
  code('      setTimeout(() => { resolve(10) }, 3000)')
  code('    })')
  code('  }')

  log("This creates a function that, each time it is invoked, " +
    "creates a new promise that triggers a Timeout that ultimately resolves " +
    "and settles the initially-pending promise.\n\n")

  // Demonstrate await syntax
  const demonstrateAwaitSyntax = async () => {
    const value = await FuncForPromiseTimeout()
    log(value)
  }

  // Demonstrate then syntax
  const demonstrateThenSyntax = async () => {
    await FuncForPromiseTimeout().then(value => log(value))
  }

  log("The `await func()` syntax, encapsulated in a function -- ")
  log("executing immediately (WITH an await in front of the function)...\n")

  code('  const demonstrateAwaitSyntax = async () => {')
  code('    const value = await FuncForPromiseTimeout()')
  code('    log(value)')
  code('  }\n\n')
  await demonstrateAwaitSyntax()


  log("The `await func().then` syntax, encapsulated in a function -- ")
  log("executing immediately (WITH an await in front of the function)...\n")

  code('  const demonstrateThenSyntax = async () => {')
  code('    await FuncForPromiseTimeout().then(value => log(value))')
  code('  }\n\n')
  await demonstrateThenSyntax()
}


const notInOrderDemo = async () => {

  log("Let's use a promise, with two different syntaxes...\n")

  // const promiseTimeout = new Promise((resolve, reject) => {
  //     setTimeout(() => { resolve(10) }, 3000)
  // })

  const FuncForPromiseTimeout = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(10) }, 3000)
    })
  }

  log("First let's see the code explicitly creating a promise:\n")

  code('  const FuncForPromiseTimeout = () => {')
  code('    return new Promise((resolve, reject) => {')
  code('      setTimeout(() => { resolve(10) }, 3000)')
  code('    })')
  code('  }')

  log("\nThis creates a function that, each time it is invoked, " +
    "creates a new promise that triggers a Timeout that ultimately resolves " +
    "and settles the initially-pending promise.\n\n")

  // Demonstrate straight-invokation of an await syntax
  const demonstrateAwaitSyntax = async () => {
    const value = await FuncForPromiseTimeout()
    log(value)
  }

  log("The `await func()` syntax, encapsulated in a function -- ")
  log("executing immediately (with NO await in front of the function)...\n")

  code('  const demonstrateAwaitSyntax = async () => {')
  code('    const value = await FuncForPromiseTimeout()')
  code('    log(value)')
  code('  }\n\n')
  /* Note there is NO await here, which allows the following code to execute
  ** immediately after this sets a timeout. */
  demonstrateAwaitSyntax()

  // Demonstrate then syntax
  log("The `await func().then` syntax -- executing immediately...\n")

  code('  await FuncForPromiseTimeout().then(value => console.log(value))\n\n')
  await FuncForPromiseTimeout().then(value => log(value))

}


const run = async () => {
  log("TWO DEMOS, one not-in-order and one in-order...")
  log("===============================================")
  log("\n")

  log("DEMO 1: in-order")
  log("-----------------------------------------------")
  await inOrderDemo()
  log("\n")

  log("DEMO 2: not-in-order")
  log("-----------------------------------------------")
  await notInOrderDemo()

}

// const run = async () => {
//   const trivialPromise = new Promise((resolve) => resolve())
//   trivialPromise
//     .then(() => log("TWO DEMOS, one not-in-order and one in-order..."))
//     .then(() => log("==============================================="))
//     .then(() => log("\n"))

//     .then(() => log("DEMO 1: not-in-order"))
//     .then(() => log("-----------------------------------------------"))
//     .then(async () => await notInOrderDemo())
//     .then(() => log("\n"))

//     .then(() => log("DEMO 2: in-order"))
//     .then(() => log("-----------------------------------------------"))
//     .then(async () => await inOrderDemo())
// }


//export {}

//if(require.main == module) run()
run()

//export {}
/* Executing this seemingly useless command allows top-level `await`s, when
** using TypeScript 3.8.  (See https://www.techiediaries.com/typescript/
**  ecmascript-top-level-await-async-typescript-3-8-example/)
** But I'm not using TypeScript, so I have to put the await into an async
** function.
*/
