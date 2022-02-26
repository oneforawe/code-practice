type Index = number;

/**
 * A binary search of a ("low"-to-"high") inequality-sorted list for an index
 * of an item with a specific value, if any exist, and if multiple such indices
 * exist, just return the first such index found with this scheme.
 * Test list items starting with the middle index, using a low/mid/high index
 * scheme.
 */
export const binarySearchForItem = (
  list: Array<any>,
  value: any,
): Index | null => {

  let low: Index = 0;
  let high: Index = list.length - 1;

  while (low <= high) {
    const mid: Index = Math.floor((low + high) / 2);
    const testValue: any = list[mid];

    if (testValue === value) {
      return mid;
    }

    if (testValue > value) {
      // Test value is too high, so `high` index is too high -- adjust it.
      high = mid - 1;
    } else {
      // Test value is too low, so `low` index is too low -- adjust it.
      low = mid + 1;
    }
  }

  return null; // If no such value is found.
}



type Item = any;
type List = Array<Item>;
//type Index = number;

type TestFunctionInputs = { index: Index, list: List };
type TestFunction = (params: TestFunctionInputs) => boolean;

type HeadExtreme = 'headwardmost' | 'low-index';
type TailExtreme = 'tailwardmost' | 'high-index';

export type BinarySearchForBoundaryInputs = {
  list: List,
  testFunction: TestFunction,
  bool: boolean,
  preference: HeadExtreme | TailExtreme,
};

export type BinarySearchForBoundaryReturn = Index | null;

export type BinarySearchForBoundary = (
  params: BinarySearchForBoundaryInputs
) => Index | null;

/**
 * A binary search of a test-function-sorted list for the index of an item in
 * the list that is the extremal item (headwardmost or tailwardmost - closest
 * to the head or tail of the list) with a particular boolean test-result
 * (true or false), if any -- so finding the index of an element either at an
 * end of the list or at a boundary in the boolean-valued test-function-results,
 * if such an index exists.  Assuming that the list really is test-function-
 * sorted, there can be only one such boundary, if any.  Selecting a particular
 * desired test-function value of `bool` determines which side of the boundary
 * is chosen.  And preferring a headwardmost or tailwardmost item determines
 * which item is chosen if the test function is constant across the whole list.
 */
export const binarySearchForBoundary: BinarySearchForBoundary = (params) => {

  const { list, testFunction, bool, preference } = params;

  let prefer: 'low' | 'high';
  switch (preference) {
    case 'headwardmost':
    case 'low-index':
      prefer = 'low';
      break;
    case 'tailwardmost':
    case 'high-index':
      prefer = 'high';
      break;
  }

  let low: Index = 0;
  let lowBool = testFunction({ index: low, list });

  let high: Index = list.length - 1;
  let highBool = testFunction({ index: high, list });

  /**
   * Boundary cases of this problem (ironically *not* dealing with the
   * potential internal boundary in the test-function results across the list):
   */
  if (lowBool !== bool && highBool !== bool) {
    return null;
  }
  if (prefer === 'low' && lowBool === bool) {
    return low;
  }
  if (prefer === 'high' && highBool === bool) {
    return high;
  }

  /**
   * Now dealing with the internal boundary, if it exists:
   */

  // low-index-preference boundary binary search
  if (prefer === 'low' && lowBool !== bool && highBool === bool) {
    // low = nope (too low) ; high = potential
    while (low !== high - 1) {
      const mid = Math.floor((low + high) / 2);
      const midBool = testFunction({ index: mid, list });
      if (midBool === bool) {
        // mid is a new potential (so `high` index is too high -- adjust it).
        high = mid;
      } else {
        // mid is a new nope (so `low` index is too low -- adjust it).
        low = mid;
      }
    }
    return high;
  }

  // high-index-preference boundary binary search
  if (prefer === 'high' && lowBool === bool && highBool !== bool) {
    // low = potential ; high = nope (too high)
    while (low !== high - 1) {
      const mid = Math.ceil((low + high) / 2);
      const midBool = testFunction({ index: mid, list });
      if (midBool === bool) {
        // mid is a new potential (so `low` index is too low -- adjust it).
        low = mid;
      } else {
        // mid is a new nope (so `high` index is too high -- adjust it).
        high = mid;
      }
    }
    return low;
  }

  /**
   * I think this result should not be reached, but the TypeScript compiler
   * doesn't know that and so wants assurance that the function will return the
   * type that I've specified...
   */
  return null;
}