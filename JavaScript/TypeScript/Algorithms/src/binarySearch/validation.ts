import {
  BinarySearchForBoundaryInputs,
  BinarySearchForBoundaryReturn,
} from './binarySearches';

export type ValidationItem = {
  input: [
    BinarySearchForBoundaryInputs['list'],
    BinarySearchForBoundaryInputs['testFunction'],
    BinarySearchForBoundaryInputs['bool'],
    BinarySearchForBoundaryInputs['preference'],
  ],
  retVal: BinarySearchForBoundaryReturn,
};

type ValidationItems = Array<ValidationItem>;

export const validationItems: ValidationItems = [
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x < 3),
      true,
      'tailwardmost'
    ],
    retVal: 4,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x < 3),
      true,
      'headwardmost'
    ],
    retVal: 0,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x > 3),
      true,
      'headwardmost'
    ],
    retVal: 6,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x > 3),
      true,
      'tailwardmost'
    ],
    retVal: 7,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x < 3),
      false,
      'tailwardmost'
    ],
    retVal: 7,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x < 3),
      false,
      'headwardmost'
    ],
    retVal: 5,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x > 3),
      false,
      'headwardmost'
    ],
    retVal: 0,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x > 3),
      false,
      'tailwardmost'
    ],
    retVal: 5,
  },
  {
    input: [
      [ 1, 2, 2, 2, 2, 3, 4, 5 ],
      (x: number) => (x < 1),
      true,
      'tailwardmost'
    ],
    retVal: null,
  },
];