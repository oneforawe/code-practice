#!/usr/bin/env python3
#filename: TwoSum.py

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
                       up to
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
        for i in range(0, len(nums)) :
            complement = target - nums[i]
            if nums[i] in complements :
                return [ nums.index(complement), i ]
            complements.add(complement)

        print("Error: The list `nums` must have a solution.")
        return -1


if __name__ == '__main__':

    import sys
    import os

    soln = Solution()

    f_in = open(sys.argv[1],'r')

    os.environ['OUTPUT_PATH'] = "./Output.txt"
    f_out = open(os.environ['OUTPUT_PATH'],'w')

    num_trials = int(f_in.readline().strip('\n'))
    for _ in range(num_trials):
        numbers_str = f_in.readline().strip('\n').split(' ')
        numbers = list(map(int, numbers_str))
        sum_target = int(f_in.readline().strip('\n'))
        result = soln.twoSum(numbers,sum_target)
        f_out.write( str(result) + '\n' )

    f_in.close()
    f_out.close()

