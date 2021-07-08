#!/usr/bin/env node
/**
 * Filename: promises-rej-consolelog.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester <andrew@andrew-forrester.com>
 *
 * Basic Usage: Execute in a shell `node promises-rej-consolelog.js`
 */

const FuncForPromiseTimeoutResolves = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve('The promise was resolved/fulfilled/kept.') }, 1500)
  })
}

const FuncForPromiseTimeoutRejects = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { reject('The promise was rejected/broken.') }, 1500)
  })
}

// Demonstrate then syntax
const demonstrateThenSyntax = async () => {
  await FuncForPromiseTimeoutRejects().then(
    // resolved
    (value) => log(value),
    // rejected
    (reason) => {
      console.log(`In the 'then' syntax..`)
      console.log(`reason = ${reason}`)
      return reason
    }
  )
}

// Demonstrate await syntax
//const demonstrateAwaitSyntax = async () => {
//  const result = await FuncForPromiseTimeoutRejects()
//  console.log(`In the 'await' syntax..`)
//  console.log(`result = ${result}`)
//  return result
//}


const demo = async () => {
  let promiseKeeper  = FuncForPromiseTimeoutResolves()
  let promiseBreaker = FuncForPromiseTimeoutRejects()
  console.dir(`promiseKeeper  = ${promiseKeeper}`)
  console.dir(promiseKeeper)
  console.dir(`promiseBreaker = ${promiseBreaker}`)
  console.dir(promiseBreaker)
  await demonstrateThenSyntax()
  //await demonstrateAwaitSyntax()
  console.dir(`promiseKeeper  = ${promiseKeeper}`)
  console.dir(promiseKeeper)
  console.dir(`promiseBreaker = ${promiseBreaker}`)
  console.dir(promiseBreaker)
}


//if(require.main == module) run()
demo()
