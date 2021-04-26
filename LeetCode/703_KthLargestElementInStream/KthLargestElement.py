#!/usr/bin/env python3
# filename: KthLargestElement.py
# purpose: Solve leetcode problem 703 "Kth Largest Element in a Stream".

"""
KthLargestElement.py
~~~~~~~~~~~~~~~~~~~~
Design a class to find the kth largest element in a stream. Note that it
is the kth largest element in the sorted order, not the kth distinct
element.

Your KthLargest class will have a constructor which accepts an integer k
and an integer array nums, which contains initial elements from the
stream. For each call to the method KthLargest.add, return the element
representing the kth largest element in the stream.

Example:
k = 3
arr = [4,5,8,2]
kthLargest = KthLargest(k, arr)
kthLargest.add(3)  # returns 4
kthLargest.add(5)  # returns 5
kthLargest.add(10) # returns 5
kthLargest.add(9)  # returns 8
kthLargest.add(4)  # returns 8

Note:
You may assume that nums' length ≥ k-1 and k ≥ 1.


To operate, execute the following in a shell terminal:
python3 KthLargestElement.py Input.txt
"""

import os
import sys
import ast
from typing import List


class KthLargest:

    def __init__(self, k: int, nums: List[int]):


    def add(self, val: int) -> int:



    # Your KthLargest object will be instantiated and called as such:
    # obj = KthLargest(k, nums)
    # param_1 = obj.add(val)



def main():
    """Apply KthLargest() functions to input file, print to output file
    and screen."""
    with open('Output.txt', 'w') as file_out:
        nums = list()
        initialize = True
        for line in open(sys.argv[1], 'r'):
            if initialize == True:
                k_str, nums_str = line.split(',', maxsplit=1)
                k = int(k_str.strip())
                nums = ast.literal_eval(nums.strip())
                kthLargest = KthLargest(k, nums)
                initialize = False
            else:
                next_str = line.strip()
                if next_str == '':
                    initialize = True
                else:
                    next_num = int(next_str)


            result = soln.canFinish(num, prereqs)
            output_str = line + str(result) + '\n'
            file_out.write(output_str + '\n')
            print(output_str)


if __name__ == '__main__':
    main()


"""
Notes

"""

