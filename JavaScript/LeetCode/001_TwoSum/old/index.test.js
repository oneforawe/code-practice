const assert = require('assert')
const { forEach, map } = require('./index')

// DON'T NEED THIS WITH MOCHA:
// const test = (description, func) => {
//   console.log('------- TEST:', description);
//   try { func(); }
//   catch (err) { console.log('              *', err.message); };
// };


it('function: forEach', () => {
  let sum = 0
  forEach( [1,2,3], value => { sum += value } )

  assert.strictEqual(sum, 7, 'ERROR: summation')
  assert.strictEqual(sum, 6, 'ERROR: summation')
})

it('function: map', () => {
  const doubled = map( [1,2,3], value => { return value * 2 } )

  //assert.deepStrictEqual(doubled, [2,4,7])
  assert.strictEqual(doubled[0], 2)
  assert.strictEqual(doubled[1], 5)
  //assert.strictEqual(doubled[1], 5, 'ERROR: doubled[1]')
  assert.strictEqual(doubled[2], 6)
})