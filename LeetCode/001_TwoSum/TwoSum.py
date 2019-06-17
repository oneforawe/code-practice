#!/usr/bin/env python3
# filename: TwoSum.py
# purpose: Solve leetcode problem 1 "Two Sum".

"""
TwoSum.py
~~~~~~~~~
Given an array of integers, return indices of the two numbers such that
they add up to a specific target.

You may assume that each input would have exactly one solution, and you
may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

To operate, execute the following in a shell terminal:
python3 TwoSum.py Input.txt
"""

import os
import sys


class Solution :
    def twoSum(self, nums, target) :
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """

        # Complete code would test inputs:
        # test nums is a list that contains integers only
        # test target is an integer

        complements = set()
        for i in range(0, len(nums)) :
            complement = target - nums[i]
            if nums[i] in complements :
                return [ nums.index(complement), i ]
            complements.add(complement)

        print("Error: The list `nums` must have a solution.")
        return -1


def main():
    """Apply twoSum() to input file, print to output file and screen."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        with open(sys.argv[1], 'r') as file_in:
            num_trials = int(file_in.readline().rstrip())
            for _ in range(num_trials):
                numbers_str = file_in.readline().rstrip()
                numbers = list(map(int, numbers_str.split()))
                sum_target = int(file_in.readline().rstrip())
                result = soln.twoSum(numbers, sum_target)
                file_out.write(str(result) + '\n')
                print(numbers_str + '\n'
                      + str(sum_target) + '\n' + str(result) + '\n')


if __name__ == '__main__':
    main()


