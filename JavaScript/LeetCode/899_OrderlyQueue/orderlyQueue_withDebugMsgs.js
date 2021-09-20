#!/usr/bin/env node
// filename: orderlyQueue.js
// purpose: Solve leetcode problem 899 "Orderly Queue".

/**
 * 899. Orderly Queue
 * [Hard]
 *
 * You are given a string s and an integer k. You can choose one of the first k
 * letters of s and append it at the end of the string..
 *
 * Return the lexicographically smallest string you could have after applying
 * the mentioned step any number of moves.
 *
 * Example 1:
 * Input: s = "cba", k = 1
 * Output: "acb"
 *
 * Explanation:
 * In the first move, we move the 1st character 'c' to the end, obtaining the
 * string "bac".
 * In the second move, we move the 1st character 'b' to the end, obtaining the
 * final result "acb".
 *
 * Example 2:
 * Input: s = "baaca", k = 3
 * Output: "aaabc"
 *
 * Explanation:
 * In the first move, we move the 1st character 'b' to the end, obtaining the
 * string "aacab".
 * In the second move, we move the 3rd character 'c' to the end, obtaining the
 * final result "aaabc".
 *
 * Constraints:
 * 1 <= k <= s.length <= 1000
 * s consist of lowercase English letters.
 */


/**
 * Notes
 * 0) I don't like this "smallest" terminology; instead I'll say "foremost".
 *    What we're talking about is just the order imposed by an alphabetical
 *    sort. By "foremost" I'm referring to the closest possible lexicographical
 *    position to the first string "a" in an alphabetic / lexicographic
 *    ordering of strings, which one could consider to be the "smallest" or
 *    "lowest" (or even "highest") or "earliest" or front-most / foremost
 *    position (that is, closest to the fore / front).
 * 1) k=1 is just cycling
 * 2) k>1 is isomorphic to arbitrary sort (& can deploy a builtin string sort)
 * 3) For k=1, to find the "foremost" cycle, note that if there is only one
 *    occurence of the foremost letter in the string (that is, the letter
 *    closest to 'a'), then we simply need to take the string starting at that
 *    one letter.  If, however, there are two occurences of that letter, then
 *    we need to compare to see which cycle is foremost.
 *    In my mind, I'm visualizing a tree of cycles that need comparison:
 *       Let's call the foremost letter/
 *       character c1. Let's say there are        c1       (  c1[1]  c1[2]  )
 *       two occurences of this letter,           c2       ( c12[1]  c12[2] )
 *       and it so happens that the next      c3[1] c3[2]  (c123[1]  c123[2])
 *       character is the same character
 *       for both of these occurences. Looking at the third character in these
 *       two cycles, we find two different characters.  At this point, we only
 *       really need to compare these last two characters to see which cycle is
 *       foremost.
 *       To take another example, let's assume that there are three occurences
 *       of the foremost letter.
 *
 *          c1                 c1
 *          c2           c2a  c2a   c2b          c2a < c2b
 *          c3           c3a  c3b                c3b < c3a
 *
 *       => foremost cycle starts with  c1 c2a c3b
 *
 *    So, a strategy for k=1, to find the foremost cycle, can be to
 *    a) search for the foremost letter
 *    b) search for occurences of the foremost letter
 *       (a & b could be put into one step if saving findings into an
 *        appropriate data structure)
 *    c) if more than one occurrence, search for the second letter in each
 *       of these cycles, keeping track of what the foremost letter is in this
 *       set of second-letters
 *    ...
 *
 *    This strikes me as being recursive:
 *    a) Start with the unexamined string and without a list of cycles, yet;
 *       Implicitly, we'll be starting with all cycles, to examine all of them;
 *       Compare by next (1st) letter of all given cycles - & find the foremost
 *       Return foremost cycles (in a useful general way along with the string)
 *    b) If there's one cycle; done.
 *       Restricted to all found foremost cycles,
 *       compare by next (second) letter in each cycle - & find the foremost.
 *       Return foremost cycles (in a useful general way along with the string)
 *    c) etc
 *
 * Illustration:
 *  Start with a string s of length 12.  Let's say s = "fcczcccabgab".
 *  Examine and tally each letter/cycle - we're looking at the first letter
 *  (depth=0) of each cycle.
 *  ------------------------
 *   Depth 0 (first letters)
 *  ------------------------
 *   a: [7, 10]    =>    Two cycles with the foremost letter a.
 *   b: [8, 11]          We can hereafter continue referring to these two
 *   .                   cycles by the position of their first letters.
 *   z: [3]              Let's pass on this list to the next stage:
 *                        cyclesIdxArr = [7, 10]
 *  -------------------------
 *   Depth 1 (second letters)
 *  -------------------------
 *   a: []               Note: (cycle-number + depth) mod 12 = letter-position
 *   b: [7, 10]    =>    The two cycles have the same next letters, so we need
 *   .                   to continue deeper in order to compare them.
 *   z: []               We'll thus be passing on the same list of cycles:
 *                        cyclesIdxArr = [7, 10]
 *  ------------------------
 *   Depth 2 (third letters)
 *  ------------------------
 *   a: []               So, for this letter f, we have a position of:
 *   .                    10 + 2 mod 12 = 0
 *   f: [10]       =>    Let's say the foremost letter at this depth, for our
 *   .                   two competing cycles is f, and we see that cycle 10 is
 *   z: []               thus the foremost cycle.
 *                       We're left with only one cycle, and so we're done:
 *                        cyclesIdxArr = [10]
 */



// Transform a string into the lexically-foremost state possible, given the
// transformation constraints as described in the problem statement.
function getForemostTransform(s, k) {
  let transform
  if (k === 1) { // k=1 => transformation restricted to cycling
    // Find the foremost cycle
    const len = s.length
    transform = findForemostCycle(s, len)
  }
  else { // k>1 => transformation isomorphic to arbitrary sort
    transform = s.split('').sort().join('')
  }
  console.log(transform)
  return transform
}


// SUPPORTING FUNCTIONS AND CONSTANTS

const alph = 'abcdefghijklmnopqrstuvwxyz'

function getAlphConverter() {
  const alphArr = alph.split('')
  const reducer = (accum, currVal, currIdx) => {
    accum[currVal] = currIdx
    return accum
  }
  return alphArr.reduce(reducer, {})
}

const convert = getAlphConverter()
// The `convert` array is for converting letters to alphabetic indices.



function findForemostCycle(s, len, depth, cyclesIdxArr) {
  // Given a set of cycles (or all cycles) at a given depth into each cycle
  // (expressed as a relative index), find the foremost cycles.
  if (depth !== undefined) {
    console.log(`At depth ${depth}, cyclesIdxArr:`)
    console.dir(cyclesIdxArr)
  }
  let newCyclesIdxArr
  let cycleComparisonArr
  if (cyclesIdxArr === undefined) {
    // Start with entire string, tallying the first letter of all cycles.
    newCyclesIdxArr = s.split('').map((letter, index) => (index))
    // Return value from recursive analysis.
    const finalAnswer = findForemostCycle(s, len, 0, newCyclesIdxArr)
    console.log(`Final answer    = ${finalAnswer}`)
    console.log(`Starting string = ${s}`)
    return finalAnswer
    //return findForemostCycle(s, len, 0, newCyclesIdxArr)
  }
  else if (cyclesIdxArr.length === 0) {
    throw new Error('There should be at least one foremost letter in a given' +
    'set of cycles.')
  }
  else if (
    cyclesIdxArr.length === 1
    ||
    (depth > 0 && cyclesIdxArr.length === len)
  ) {
    // The foremost cycle (unique or repeating) is found, construct its string.
    return constructCycleString(cyclesIdxArr[0], s, len)
  }
  else { // if  1 < cyclesIdxArr.length < len
    if (depth === len) {
      // Examined whole string, the remaining cycles must be equivalent.
      return constructCycleString(cyclesIdxArr[0], s, len)
    }
    else {
      // Tabulate cycles for comparison.
      cycleComparisonArr = tabulateCyclePlacings(s, len, depth, cyclesIdxArr)
      // Extract the foremost cycles at this depth.
      newCyclesIdxArr = extractForemostCycles(cycleComparisonArr)
      return findForemostCycle(s, len, depth + 1, newCyclesIdxArr)
    }
  }
}



function tabulateCyclePlacings(s, len, depth, cyclesIdxArr) {
  const cycleComparisonArrInit = Array.from(Array(26), () => [])
  let cycleComparisonArr = cycleComparisonArrInit
  console.log('initial comparison array:')
  console.dir(cycleComparisonArr)
  for (let i of cyclesIdxArr) {
    console.log(`running through cyclesIdxArr, i = ${i}`)
    const letterIdx = (i + depth) % len
    console.log(`letterIdx = ${letterIdx}`)
    console.log(`s[letterIdx] = ${s[letterIdx]}`)
    console.log(`convert[s[letterIdx]] = ${convert[s[letterIdx]]}`)
    console.log('cycleComparisonArr[convert[s[letterIdx]]]:')
    console.dir(cycleComparisonArr[convert[s[letterIdx]]])
    cycleComparisonArr[convert[s[letterIdx]]].push(i)
    console.log('After pushing, now cycleComparisonArr:')
    console.dir(cycleComparisonArr)
  }
  return cycleComparisonArr
}

function extractForemostCycles(cycleComparisonArr) {
  console.log('extracting first array from:')
  console.dir(cycleComparisonArr)
  let newCyclesIdxArr
  for (let arr of cycleComparisonArr) {
    if (arr.length > 0) {
      newCyclesIdxArr = arr
      break
    }
  }
  console.log('this is what was extracted:')
  console.dir(newCyclesIdxArr)
  return newCyclesIdxArr
}

function constructCycleString(cycleIdx, s, len) {
  console.log(`winning cycle index: ${cycleIdx} (of ${s})`)
  const cycleString = s.slice(cycleIdx, len) + s.slice(0, cycleIdx)
  return cycleString
}

let string, k

k = 1
string = 'a'
console.log(`string = ${string}, k = ${k}`)
getForemostTransform(string, k)
console.log('')

k = 1
string = 'halpy'
console.log(`string = ${string}, k = ${k}`)
getForemostTransform(string, k)
console.log('')

k = 2
string = 'halpy'
console.log(`string = ${string}, k = ${k}`)
getForemostTransform(string, k)
console.log('')

k = 1
string = 'fcczcccabgab'
console.log(`string = ${string}, k = ${k}`)
getForemostTransform(string, k)
console.log('')

k = 2
string = 'fcczcccabgab'
console.log(`string = ${string}, k = ${k}`)
getForemostTransform(string, k)
console.log('')

k = 1
string = 'abzabc'
console.log(`string = ${string}, k = ${k}`)
getForemostTransform(string, k)
console.log('Answer should be abcabz')
console.log('')



module.exports = { getForemostTransform }