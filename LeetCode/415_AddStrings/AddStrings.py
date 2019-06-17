#!/usr/bin/env python3
# filename: AddStrings.py
# purpose: Solve leetcode problem 415 "Add Strings".


"""
AddStrings.py
~~~~~~~~~~~~~~~
Given two non-negative integers num1 and num2 represented as strings,
return the sum of num1 and num2.

Requirements:
The length of each number is < 5100.
Both num1 and num2 contain only digits 0-9.
Neither num1 nor num2 contain any leading zeros.
This script does not use any built-in BigInteger libraries nor does it
convert the inputs to integers directly.

To operate, execute the following in a shell terminal:
python3 AddStrings.py Input.txt
"""

import os
import sys


class Solution:

    def addStrings(self, num1: str, num2: str) -> str:
        # Complete code would test inputs:
        # test inputs for length (<5100) and content (digits only, non-negative)
        # test inputs for leading zeros

        # Will perform addition character-by-character, using longest string
        # (and max number) as reference; so first find longest string:
        if len(num1) >= len(num2):
            num_max, num_min = num1, num2
        else:
            num_max, num_min = num2, num1
        len_max, len_min = len(num_max), len(num_min)

        # Prepare for addition
        sum_str = ""
        carry = 0

        # Perform addition across all characters of longest string
        # (using right-most, lowest place-valued characters first)
        for i in range(len_max):
            digA = int(num_max[-1-i])
            if i < len_min:
                digB = int(num_min[-1-i])
            else:
                digB = 0
            sum_in_place = digA + digB + carry
            dig_in_place = sum_in_place % 10
            carry = (sum_in_place - dig_in_place) // 10
            sum_str = str(dig_in_place) + sum_str

        # Any left-over carry value must be added
        if carry != 0:
            sum_str = str(carry) + sum_str

        return sum_str


def main():
    """Apply addStrings() to input file, outputing to output file."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            num1, num2 = tuple(line.rstrip().split())
            result = soln.addStrings(num1, num2)
            file_out.write(num1 + ' ' + num2 + ' ' + result + '\n')
            print(num1 + ' ' + num2 + ' ' + result)


if __name__ == '__main__':
    main()


"""
Notes

One solution would be to perform the overall sum character by character:
starting from the ends, turn each character into an integer, add them together,
place the overall sum's current character, and carry the higher-place-value to
the next character-sum.

"""

