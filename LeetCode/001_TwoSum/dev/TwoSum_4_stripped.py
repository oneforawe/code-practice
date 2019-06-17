#!/usr/bin/env python3
#filename: TwoSum_4.py

class Solution :
    def twoSum(self, nums, target) :

        complements = set()
        for i in range(0, len(nums)) :
            complement = target - nums[i]
            if nums[i] in complements :
                return [ nums.index(complement), i ]
            complements.add(complement)

        print("Error: The list `nums` must have a solution.")
        return -1
