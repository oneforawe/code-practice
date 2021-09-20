// As submitted to LeetCode.com
// https://leetcode.com/problems/orderly-queue/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var orderlyQueue = function(s, k) {
  let transform
  if (k === 1) {
    const len = s.length
    transform = findForemostCycle(s, len)
  }
  else {
    transform = s.split('').sort().join('')
  }
  return transform
}

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

function findForemostCycle(s, len, depth, cyclesIdxArr) {
  let newCyclesIdxArr
  let cycleComparisonArr
  if (cyclesIdxArr === undefined) {
    newCyclesIdxArr = s.split('').map((letter, index) => (index))
    const finalAnswer = findForemostCycle(s, len, 0, newCyclesIdxArr)
    return finalAnswer
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
    return constructCycleString(cyclesIdxArr[0], s, len)
  }
  else {
    if (depth === len) {
      return constructCycleString(cyclesIdxArr[0], s, len)
    }
    else {
      cycleComparisonArr = tabulateCyclePlacings(s, len, depth, cyclesIdxArr)
      newCyclesIdxArr = extractForemostCycles(cycleComparisonArr)
      return findForemostCycle(s, len, depth + 1, newCyclesIdxArr)
    }
  }
}

function tabulateCyclePlacings(s, len, depth, cyclesIdxArr) {
  const cycleComparisonArrInit = Array.from(Array(26), () => [])
  let cycleComparisonArr = cycleComparisonArrInit
  for (let i of cyclesIdxArr) {
    const letterIdx = (i + depth) % len
    cycleComparisonArr[convert[s[letterIdx]]].push(i)
  }
  return cycleComparisonArr
}

function extractForemostCycles(cycleComparisonArr) {
  let newCyclesIdxArr
  for (let arr of cycleComparisonArr) {
    if (arr.length > 0) {
      newCyclesIdxArr = arr
      break
    }
  }
  return newCyclesIdxArr
}

function constructCycleString(cycleIdx, s, len) {
  const cycleString = s.slice(cycleIdx, len) + s.slice(0, cycleIdx)
  return cycleString
}