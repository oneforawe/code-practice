/**
 * To execute an Algorithm test, while at the root `Algorithm` folder
 * run `mocha lib/<path-to-this-library>` in the shell.
 */

import { solutionProposals, SolutionProposal } from './proposals';
import { validationItems, ValidationItem } from './validation';
import assert from 'assert';


function testSolution(
  solutionItem: SolutionProposal,
  validationIdx: number,
  validationItem: ValidationItem,
) {
  const { input, retVal } = validationItem;
  it(`test: ${solutionItem.name} (validation ${validationIdx})`, () => {
    assert.deepStrictEqual(solutionItem.func(input), retVal)
  });
}

solutionProposals.forEach(solutionItem => {
  validationItems.forEach( (validationItem, index) => {
    testSolution(solutionItem, index, validationItem)
  })
});