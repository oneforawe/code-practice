#!/usr/bin/env python3
#filename: TwoSum_3.py

"""
This program is a solution to a leetcode.com programming problem.

LeetCode problem title: 1. Two Sum

~~~~~~~~~~~~~~~~~~~
Problem Description
~~~~~~~~~~~~~~~~~~~

Given an array of integers, return indices of the two numbers such that
they add up to a specific target.

You may assume that each input would have exactly one solution, and you
may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Provided Beginning of Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Solution:
    def twoSum(self, nums, target):
        ~triple quote~
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        ~triple quote~

~~~~~~~~~~~~~~~~~~~
Using This Solution
~~~~~~~~~~~~~~~~~~~

In this version of the solution, I do not use the class and "self"
reference to an instance of that class.  (I don't follow the hint
implicit in the "Provided Beginning of Solution".)

Still, this is a valid solution, and it can be used with the following
commands:

.  >>> from TwoSum_1 import Solution
.  >>> Solution.twoSum(Solution,[0,0],0)
.  [0, 1]
.  >>> mysoln = Solution
.  >>> Solution.twoSum(mysoln,[0,0],0)
.  [0, 1]


Misusage / Errors:

.  >>> Solution.twoSum()
.  Traceback (most recent call last):
.    File "<stdin>", line 1, in <module>
.  TypeError: twoSum() missing 3 required positional arguments: 'self', 'nums', and 'target'

.  >>> Solution.twoSum([0,0],0)
.  Traceback (most recent call last):
.    File "<stdin>", line 1, in <module>
.  TypeError: twoSum() missing 1 required positional argument: 'target'

.  >>> Solution.twoSum(this,[0,0],0)
.  Traceback (most recent call last):
.    File "<stdin>", line 1, in <module>
.  NameError: name 'this' is not defined

"""

class Solution :
    def twoSum(self, nums, target) :
        """
        Return two indices for the numbers from `nums` that add up to
        `target`.

        Find and return the unique pair of (different) indices for the
        two integers in the list of integers `nums` that add up to
        `target`.  The provided list `nums` is assumed to have a unique
        solution.

        :param nums: list of integers (assumed to contain a unique
                     solution pair)
        :type nums: List[int]
        :param target: the sum that the solution pair of integers adds
                       up to `target`
        :type target: int
        :return: list of two (different) indices of `nums` elements that
                 add up to `target`
        :rtype: List[int]
        """
        if not isinstance(nums, list) :
            print("TypeError: `nums` must be a list.")
            return -1
        if any(not isinstance(n, int) for n in nums) :
            print("TypeError: `nums` must contain integers only.")
            return -1
        if type(target) is not int :
            print("TypeError: `target` must be an integer.")
            return -1

        complements = set()
        num_dict = {}
        for i in range(0, len(nums)) :
            value = nums[i]
            num_dict[i] = value
            complement = target - value
            if value in complements :
                return [ nums.index(complement), i ]
            complements.add(complement)

        print("Error: The list `nums` must have a solution.")
        return -1
