#!/usr/bin/env node
/**
 * Filename: for-loops.js
 * Language: JavaScript / ECMAScript
 * Author:   Andrew Forrester
 * Web:      https://www.andrew-forrester.com/
 *
 * Basic Usage: Execute in a shell `node for-loops.js`
 */

const object = {a: 'one', b: 'two', c: 'three', d: 'four'}
const array = ['do', 're', 'mi', 'fa', 'so']
const string = "abcdefg"

array['addedKey'] = 'clang'

console.log('')
console.log(`object = ${object}`)
console.dir(object)
console.log('')
console.log(`array  = ${array}`)
console.log('')
console.log(`string = ${string}`)
console.log('')

console.log('--------------------------------------------')
console.log(' For IN  --  KEYS IN (the pocket)')
console.log('--------------------------------------------')

console.log('')
console.log('Loop:  for-in  with  object')
for (let x in object) {
  console.log(x)
}
console.log('')
console.log('Loop:  for-in  with  array')
for (let x in array) {
  console.log(x)
}
console.log('')
console.log('Loop:  for-in  with  string')
for (let x in string) {
  console.log(x)
}
console.log('')

console.log('--------------------------------------------')
console.log(' For OF  --  VALUES OF (iterables)')
console.log('--------------------------------------------')

console.log('')
console.log('Loop:  for-of  with  object')
console.log(' NOPE: object not iterable')
// for (let x of object) {
//   console.log(x)
// }
console.log('')
console.log('Loop:  for-of  with  array')
for (let x of array) {
  console.log(x)
}
console.log('')
console.log('Loop:  for-of  with  string')
for (let x of string) {
  console.log(x)
}
console.log('')

console.log('--------------------------------------------')
console.log(' for of  --  using .entries()')
console.log('--------------------------------------------')

console.log('')
console.log('Loop:  for-of  with  Object.entries(object)')
for (let x of Object.entries(object)) {
  console.log(x)
}
console.log('')
console.log('Loop:  for-of  with  array.entries()')
for (let x of array.entries()) {
  console.log(x)
}
console.log('')

console.log('--------------------------------------------')
console.log(' for of  --  using .keys()')
console.log('--------------------------------------------')

console.log('')
console.log('Loop:  for-of  with  Object.keys(object)')
for (let x of Object.keys(object)) {
  console.log(x)
}
console.log('')
console.log('Loop:  for-of  with  Object.keys(array)')
for (let x of Object.keys(array)) {
  console.log(x)
}
console.log('')

