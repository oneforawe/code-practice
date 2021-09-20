// To execute test run `mocha orderlyQueue.test.js` in the shell.

const solutionProposals = require('./orderlyQueue')
const validationItems = require('./validation')
const assert = require('assert')


function testSolution(solutionItem, validationIdx, validationItem) {
  const { input, retVal } = validationItem
  it(`test: ${solutionItem.name} (validation ${validationIdx})`, () => {
    assert.deepStrictEqual(solutionItem.func(...input), retVal)
  })
}

solutionProposals.forEach(solutionItem => {
  validationItems.forEach( (validationItem, index) => {
    testSolution(solutionItem, index, validationItem)
  })
})