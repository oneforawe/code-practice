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
        sum_str = ""
        carry = 0
        for char1, char2 in zip(reversed(num1), reversed(num2)):
            dig1, dig2 = int(char1), int(char2)
            sum_in_place = dig1 + dig2 + carry
            dig_in_place = sum_in_place % 10
            carry = sum_in_place - dig_in_place
            sum_str = str(dig_in_place) + sum_str
        if carry != 0:
            sum_str = str(carry) + sum_str
        return sum_str

# 123 321 444
# 999 999 30888

def main():
    """Apply addStrings() to input file, outputing to output file."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            num1, num2 = tuple(line.rstrip().split())
            result = soln.addStrings(num1, num2)
            file_out.write(num1 + ' ' + num2 + ' ' + str(result) + '\n')


if __name__ == '__main__':
    main()


"""
Notes

One solution would be to perform the overall sum character by character:
starting from the ends, turn each character into an integer, add them together,
place the overall sum's current character, and carry the higher-place-value to
the next character-sum.

"""

