// From https://www.npmjs.com/package/readline-promise
// Modified.


import require from 'requirejs'

//import readline from 'readline-promise';
const readlinePromise = require('readline-promise').default

function setupNewRLP() {
  return readlinePromise.createInterface({
    input: process.stdin,
    output: process.stdout,
    //terminal: true, // This option was set initially, but looks like it's not necessary.
    //prompt: true,   // I tried this option, but looks like it has no effect.
  })
}

let bar = null


// async function demonstration1() {

//   // DOESN'T WORK:
//   await rlp.questionAsync('Foo? ').then(answer => {
//     rlp.close()
//     bar = answer
//     console.log(bar)
//   })

//   rlp.questionAsync('Bar? ').then(answer => {
//     rlp.close()
//     bar = answer
//     console.log(bar)
//   })
// }


async function demonstration2() {
  let rlp

  rlp = setupNewRLP()
  let answer = await rlp.questionAsync('Foo? ')
  rlp.close()
  bar = answer
  console.log(bar)

  rlp = setupNewRLP()
  answer = await rlp.questionAsync('Bar? ')
  rlp.close()
  bar = answer
  console.log(bar)
}


demonstration2()