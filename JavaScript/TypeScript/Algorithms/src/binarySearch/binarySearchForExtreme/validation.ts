import {
  BinarySearchForExtremeInputs,
  BinarySearchForExtremeReturn,
} from './index';

export type ValidationItem = {
  input:  BinarySearchForExtremeInputs,
  retVal: BinarySearchForExtremeReturn,
};

type ValidationItems = Array<ValidationItem>;

export const validationItems: ValidationItems = [
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] < 3),
      bool: true,
      preference: 'tailwardmost',
    },
    retVal: 4,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] < 3),
      bool: true,
      preference: 'headwardmost',
    },
    retVal: 0,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] > 3),
      bool: true,
      preference: 'headwardmost',
    },
    retVal: 6,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] > 3),
      bool: true,
      preference: 'tailwardmost',
    },
    retVal: 7,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] < 3),
      bool: false,
      preference: 'tailwardmost',
    },
    retVal: 7,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] < 3),
      bool: false,
      preference: 'headwardmost',
    },
    retVal: 5,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] > 3),
      bool: false,
      preference: 'headwardmost',
    },
    retVal: 0,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] > 3),
      bool: false,
      preference: 'tailwardmost',
    },
    retVal: 5,
  },
  {
    input: {
      list: [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      testFunction: ({ index, list }) => (list[index] < 1),
      bool: true,
      preference: 'tailwardmost',
    },
    retVal: null,
  },
];