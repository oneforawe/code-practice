#!/usr/bin/env python3
# filename: ReverseInteger.py
# purpose: Solve leetcode problem 7 "Reverse Integer".


"""
ReversedInteger.py
~~~~~~~~~~~~~~~~~~


To operate, execute the following in a shell terminal:
python3 ReverseInteger.py Input.txt
"""

import sys
import ast


class Solution:
    def reverse(self, x: int) -> int:
        if x < 0:
            sign = -1
        else:
            sign = 1
        y = abs(x)
        y = str(y)
        y = y[::-1] # reverse
        if y != '0':
            y = y.lstrip('0')
        y = int(y)
        y = sign * y
        # "Overflow"
        #  Minimum:  -2 ** 31     =  -2147483648
        #  Maximum:  2 ** 31 - 1  =   2147483647
        if y < -2147483648 or y > 2147483647:
            return 0
        # Otherwise
        return y


def main():
    soln = Solution()
    print(soln.reverse(123))
    print(soln.reverse(-123))
    print(soln.reverse(120))
    print(soln.reverse(0))
    print(soln.reverse(1534236469))


#def main():
#    """Apply threeSum() to input file, print to output file and
#    screen."""
#    soln = Solution()
#    with open('Output.txt', 'w') as file_out:
#        for line in open(sys.argv[1], 'r'):
#            nums_str = line.rstrip()
#            nums = ast.literal_eval(nums_str)
#            result = soln.threeSum(nums)
#            output_str = nums_str + '\n' + str(result) + '\n'
#            file_out.write(output_str + '\n')
#            print(output_str)


if __name__ == '__main__':
    main()



"""
Wrong Answer:

Input:    1534236469
Output:   9646324351
Expected: 0


"""
