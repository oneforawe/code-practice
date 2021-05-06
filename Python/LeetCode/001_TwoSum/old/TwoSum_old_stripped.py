#!/usr/bin/env python3
#filename: TwoSum_stripped.py

class Solution :
    def twoSum(self, nums, target) :
        complements = set()
        for i in range(0, len(nums)) :
            complement = target - nums[i]
            if nums[i] in complements :
                return [ nums.index(complement), i ]
            complements.add(complement)


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

