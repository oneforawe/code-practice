#!/usr/bin/env node
/**
 * Filename: promises-declare-correction-2.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester <andrew@andrew-forrester.com>
 *
 * Basic Usage: Execute in a shell `node promises-declare-correction-2.js`
 */


const demo = async () => {

  /* PROMISE KEEPER ***********************************************************/

  console.log(`\nCAN do this:\n`)

  let promiseKeeper =
    new Promise((resolve, reject) => {
      setTimeout(() => { resolve('The promise was resolved/fulfilled/kept.') }, 1500)
    })

  let promiseWrapper1 =
    promiseKeeper
    .then((response) => {
      // Resolved
      console.log('Hey, the wrapper says promiseKeeper kept the promise!')
      return response
    })
    .catch((reason) => {
      // Rejected
      console.log('Hey, the wrapper says promiseKeeper broke the promise!')
      return reason
    })

  console.dir(`Before/Pending...`)
  console.dir(`promiseKeeper:`)
  console.dir(`${promiseKeeper}`)
  console.dir(promiseKeeper)
  console.dir(`promiseWrapper1:`)
  console.dir(`${promiseWrapper1}`)
  console.dir(promiseWrapper1)

  await
    new Promise((resolve, reject) => {
      setTimeout(() => { resolve('Just waiting to let the other promise resolve.') }, 1500)
    })

  console.dir(`After/Settled...`)
  console.dir(`promiseKeeper:`)
  console.dir(`${promiseKeeper}`)
  console.dir(promiseKeeper)
  console.dir(`promiseWrapper1:`)
  console.dir(`${promiseWrapper1}`)
  console.dir(promiseWrapper1)


  /* PROMISE BREAKER **********************************************************/

  console.log(`\n\nAnd CAN do this too (because rejection was "handled" by wrapper(?)):\n`)

  let promiseBreaker =
    new Promise((resolve, reject) => {
      setTimeout(() => { reject('The promise was rejected/broken.') }, 1500)
    })

  let promiseWrapper2 =
    promiseBreaker
    .then((response) => {
      // Resolved
      console.log('Hey, the wrapper says promiseBreaker kept the promise!')
      return response
    })
    .catch((reason) => {
      // Rejected
      console.log('Hey, the wrapper says promiseBreaker broke the promise!')
      return reason
    })

  console.dir(`Before/Pending...`)
  console.dir(`promiseBreaker:`)
  console.dir(`${promiseBreaker}`)
  console.dir(promiseBreaker)
  console.dir(`promiseWrapper2:`)
  console.dir(`${promiseWrapper2}`)
  console.dir(promiseWrapper2)

  await
    new Promise((resolve, reject) => {
      setTimeout(() => { resolve('Just waiting to let the other promise resolve.') }, 1500)
    })

  console.dir(`After/Settled...`)
  console.dir(`promiseBreaker:`)
  console.dir(`${promiseBreaker}`)
  console.dir(promiseBreaker)
  console.dir(`promiseWrapper2:`)
  console.dir(`${promiseWrapper2}`)
  console.dir(promiseWrapper2)

}


//if(require.main == module) run()
demo()
