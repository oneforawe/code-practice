#!/usr/bin/env python3
# filename: 3Sum.py
# purpose: Solve leetcode problem 15 "3Sum".


"""
3Sum.py
~~~~~~~
Given an array nums of n integers, are there elements a, b, c in nums
such that a + b + c = 0?  Find all unique triplets in the array which
give the sum of zero.

Note:
The solution set must not contain duplicate triplets.

Example:
Given array nums = [-1, 0, 1, 2, -1, -4],
A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]

To operate, execute the following in a shell terminal:
python3 3Sum.py Input.txt
"""

import os
import sys
import ast
from typing import List


class Solution:

    def threeSum(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        triples = list()
        for i in range(n-2):
            for j in range(i+1,n-1):
                # If the current couple are not in any triples so far, continue
                if (len(triples) == 0) or \
                   (self.couple_not_present(nums[i], nums[j], triples) == True):
                    complement = -(nums[i] + nums[j])
                    for k in range(j+1,n):
                        if nums[k] == complement:
                            triple = sorted([nums[i], nums[j], nums[k]])
                            triples.append(triple)
                            break
        return triples

    def couple_not_present(self, a, b, triples):
        # couple = a,b
        if len(triples) == 0:
            # couple cannot be present
            return True
        else:
            # Look for couple
            for triple in triples:
                # Need to account for duplicate values
                # (eg, a,b = -1,-1; triple = [-1, 0, 0]
                #  is not a match for the couple being present)
                if a == b:
                    if triple.count(a) >= 2:
                        # couple is present
                        return False
                else:
                    if triple.count(a) >= 1 and triple.count(b) >= 1:
                        # couple is present
                        return False
        # Didn't find couple
        return True


def main():
    """Apply threeSum() to input file, print to output file and
    screen."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            nums_str = line.rstrip()
            nums = ast.literal_eval(nums_str)
            result = soln.threeSum(nums)
            output_str = nums_str + '\n' + str(result) + '\n'
            file_out.write(output_str + '\n')
            print(output_str)


if __name__ == '__main__':
    main()


"""
Notes

The most natural output would seem to be a set, but the requested output is a
list, apparently with each element a triple whose elements are ordered from
smallest to largest.  The ordering of the triples is not so clear, so there may
be some trouble in comparing answers.

I'm not sure if it will work to build a set and then transform it to a list.
(Nope: can't build a set of lists anyway -- lists are not hashable.)


1. Brute force:
    Take every pair of numbers and look for the complementary number that would
    make them a valid null triple.
    n choose 2 = n!/(2!(n-2)!) = (1/2)(n)(n-1) ~ n^2

    n = 6
    [-1, 0, 1, 2, -1, -4]
     (-1,0)   1  (check 4 places: yes)
     (-1,1)   0  (check 3 places: no; already used the previous 0, no others)
     (-1,2)  -1  (check 2 places: yes)
     (-1,-1)  2  (check 1 places: no; already used the previous 2, no others)
     (-1,-4) ..  (actually, no need to check the last value in this framework)

     (0,1)   -1  (check 3 places: yes)
     (0,2)   -2  (check 2 places: no)
     (0,-1)   1  (check 1 places: no; already used the previous 1, no others)

     (1,2)   -3  (check 2 places: no)
     (1,-1)   0  (check 1 places: no; already used the previous 0, no others)

     (2,-1)  -1  (check 1 places: no; already used the previous -1, no others)

     20 steps
"""

