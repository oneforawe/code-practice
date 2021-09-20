#!/usr/bin/env node
// filename: twoSum.js
// purpose: Solve leetcode problem 1 "Two Sum".
// note: The problem is modified so there's not always a solution, and in those
//       cases, the return value should be `null`.  Also, the array of integers
//       may be empty or have only one member.

/**
 * 1. Two Sum
 * [Easy]
 *
 * Given an array of integers nums and an integer target, return indices of the
 * two numbers such that they add up to target.  You may assume that each input
 * would have exactly one solution, and you may not use the same element twice.
 *
 * You can return the answer in any order.
 *
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Output: Because nums[0] + nums[1] == 9, we return [0, 1].
 *
 * Example 2:
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 *
 * Example 3:
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 *
 * Constraints:
 * 2 <= nums.length <= 104
 * -109 <= nums[i] <= 109
 * -109 <= target <= 109
 * Only one valid answer exists.
 */


function findTwoSumPairA(target, nums) {
  /* Given an integer from the array, we want to find if it has a "complement"
  to reach the target by summation. */
  let complement
  const len = nums.length
  for (let i = 0; i < len; i++) {
    complement = target - nums[i]
    for (let j = i+1; j < len; j++) {
      if (nums[j] === complement) {
        return [i, j]
      }
    }
  }
  return null
}
// Cost / Complexity
// Time:  O(n^2)
// Space: O(1)

// We can trade off some time complexity for some space complexity...


function findTwoSumPairB(target, nums) {
  /* Store complements while traversing the array, and check if current
  integer is among the accumlated set of complements -- using object/hashmap
  for O(1) lookup time. */
  // In the object: complements as keys, their (conjugate's) indices as values.
  const complements = {}
  for (let [index, num] of nums.entries()) {
    const prevIndex = complements[num]
    if (prevIndex !== undefined) { // if num is a listed complement
      return [prevIndex, index] // then the two-sum pair is found
    }
    else { // otherwise record/list the current num's complement
      const complement = target - num
      complements[complement] = index
    }
  }
  return null
}
// Cost / Complexity
// Time:  O(n)
// Space: O(n)



// solution from another source
function findTwoSumPairC(target, nums) {
  const complements = {}
  for (let idx = 0; idx < nums.length; idx++) {
    const prevIndex = complements[nums[idx]]
    if (prevIndex >= 0) {
      return [prevIndex, idx]
    }
    else {
      const complement = target - nums[idx]
      complements[complement] = idx
    }
  }
  return null
}


solutionProposals = [
    { name: "findTwoSumPairA", func: findTwoSumPairA },
    { name: "findTwoSumPairB", func: findTwoSumPairB },
    { name: "findTwoSumPairC", func: findTwoSumPairC },
]

module.exports = solutionProposals