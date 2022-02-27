export type Item = any;
export type List = Array<Item>;
export type Index = number;

export type BinarySearchForItemInputs = {
  list: List,
  value: any,
};

export type BinarySearchForItemReturn = Index | null;

export type BinarySearchForItem = (
  params: BinarySearchForItemInputs
) => BinarySearchForItemReturn;

/**
 * A binary search of a ("low"-to-"high") inequality-sorted list for an index
 * of an item with a specific value, if any exist, and if multiple such indices
 * exist, just return the first such index found with this scheme.
 * Test list items starting with the middle index, using a low/mid/high index
 * scheme.
 */
export const binarySearchForItem: BinarySearchForItem = (params) => {

  const { list, value } = params;

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

export default binarySearchForItem;