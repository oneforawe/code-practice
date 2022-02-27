import { binarySearchForExtreme, BinarySearchForExtreme } from './index';

export type SolutionProposal = { name: string, func: BinarySearchForExtreme };

type SolutionProposals = Array<SolutionProposal>;

export const solutionProposals: SolutionProposals = [
  { name: 'binarySearchForExtreme', func: binarySearchForExtreme },
];