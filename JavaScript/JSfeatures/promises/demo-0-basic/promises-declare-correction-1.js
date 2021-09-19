#!/usr/bin/env node
/**
 * Filename: promises-declare-correction-1.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester
 * Web:      https://www.andrew-forrester.com/
 *
 * Basic Usage: Execute in a shell `node promises-declare-correction-1.js`
 */


const demo = async () => {

  /* PROMISE KEEPER ***********************************************************/

  console.log(`\nCAN do this:\n`)

  let promiseKeeper =
    new Promise((resolve, reject) => {
      setTimeout(() => { resolve('The promise was resolved/fulfilled/kept.') }, 1500)
    })

  console.dir(`Before/Pending...`)
  console.dir(`promiseKeeper:`)
  console.dir(`${promiseKeeper}`)
  console.dir(promiseKeeper)

  await
    new Promise((resolve, reject) => {
      setTimeout(() => { resolve('Just waiting to let the other promise settle.') }, 1500)
    })

  console.dir(`After/Settled...`)
  console.dir(`promiseKeeper:`)
  console.dir(`${promiseKeeper}`)
  console.dir(promiseKeeper)


  /* PROMISE BREAKER **********************************************************/

  console.log(`\n\nAnd CAN do this too (since immediately catching error/rejection):\n`)

  let promiseBreaker =
    new Promise((resolve, reject) => {
      setTimeout(() => { reject('The promise was rejected/broken.') }, 1500)
    }).catch(err => { console.log(`Catching/Handling this "error"/rejection: ${err}`) })

  console.dir(`Before/Pending...`)
  console.dir(`promiseBreaker:`)
  console.dir(`${promiseBreaker}`)
  console.dir(promiseBreaker)

  await
    new Promise((resolve, reject) => {
      setTimeout(() => { resolve('Just waiting to let the other promise settle.') }, 1500)
    })

  console.dir(`After/Settled...`)
  console.dir(`promiseBreaker:`)
  console.dir(`${promiseBreaker}`)
  console.dir(promiseBreaker)

}


//if(require.main == module) run()
demo()
