#!/usr/bin/env node
/**
 * Filename: timer.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester
 * Web:      https://www.andrew-forrester.com/
 *
 * Basic Usage: Execute in a shell `node timer.js`
 */

const setPromiseKeeperTimer = (timeInS) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, timeInS * 1000)
  })
}

async function test() {
  await setPromiseKeeperTimer(3)
}

test()
