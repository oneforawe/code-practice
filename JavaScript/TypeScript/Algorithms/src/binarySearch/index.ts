import { binarySearchForBoundary, BinarySearchForBoundary } from './binarySearches';

export type SolutionProposal = { name: string, func: BinarySearchForBoundary };

type SolutionProposals = Array<SolutionProposal>;

export const solutionProposals: SolutionProposals = [
  { name: "binarySearchForBoundary", func: binarySearchForBoundary },
];