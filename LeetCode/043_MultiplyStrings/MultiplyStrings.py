#!/usr/bin/env python3
# filename: MultiplyStrings.py
# purpose: Solve leetcode problem 43 "Multiply Strings".


"""
MultiplyStrings.py
~~~~~~~~~~~~~~~~~~
Given two non-negative integers num1 and num2 represented as strings,
return the product of num1 and num2, also represented as a string.

Example 1:
Input: num1 = "2", num2 = "3"
Output: "6"

Example 2:
Input: num1 = "123", num2 = "456"
Output: "56088"

Note:
The length each number is < 110.
Both num1 and num2 contain only digits 0-9.
Neither num1 nor num2 contain any leading zeros, except the number 0 itself.
This script does not use any built-in BigInteger libraries nor does it
convert the inputs to integers directly.

To operate, execute the following in a shell terminal:
python3 AddStrings.py Input.txt
"""

import os
import sys


class Solution:

    def multiply(self, num1: str, num2: str) -> str:
        # Complete code would test inputs:
        # test inputs for length (<110) and content (digits only, non-negative)
        # test inputs for leading zeros

        # Prepare for multiplication
        product_accumulator = 0

        # Perform multiplication place by place (of num2) and digit by digit
        for i, char2 in enumerate(reversed(num2)):
            partial_product = 0
            dig2 = int(char2)
            for j, char1 in enumerate(reversed(num1)):
                dig1 = int(char1)
                partial_product += (dig1 * 10**i) * (dig2 * 10**j)
            product_accumulator += partial_product

        # Translate product into a string
        product_str = str(product_accumulator)

        return product_str


def main():
    """Apply addStrings() to input file, outputing to output file."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            num1, num2 = tuple(line.rstrip().split())
            result = soln.multiply(num1, num2)
            file_out.write(num1 + ' ' + num2 + ' ' + result + '\n')
            print(num1 + ' ' + num2 + ' ' + result)


if __name__ == '__main__':
    main()


"""
Notes

One solution would be to perform the multiplication as one would do on paper in
the traditional way, digit by digit, or character by character:

Input: num1 = "123", num2 = "456"

     123
   x 456                           partial_product       product_accumulator
  -------                         -------------------   ---------------------
     738  units place (of num2)    738                    738
    6150  tens place               6150                   738+6150 = 6888
 + 49200  hundreds place           49200                  6888+49200 = 56088
 --------
   56088

Output: "56088"
"""

