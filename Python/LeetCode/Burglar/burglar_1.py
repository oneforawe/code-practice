#!/usr/env/python3
# filename: burglar_1.py

"""
burglar_1.py
~~~~~~~~~~~~
This script contains a solution to the "burglar" problem, where a burglar steals
the largest amount possible from a row of houses while not robbing adjacent
houses.  This solution is achieved recursively, expressing the final solution in
terms of two "previous solutions".
"""

import os
import sys
import csv

def max_stolen_value(h_values:list) -> int:
    n = len(h_values)
    if n == 0:
        return 0
    if n == 1:
        return h_values[0]
    prev1 = max_stolen_value(h_values[:n-1])
    prev2 = max_stolen_value(h_values[:n-2])
    max_steal = max(prev1, prev2 + h_values[n-1])
    return max_steal

def main():
    os.environ['OUTPUT_PATH'] = "./output.txt"
    with open(os.environ['OUTPUT_PATH'], 'w') as f_out:
        with open(sys.argv[1],"r") as f_in:
            obj = csv.reader(f_in, delimiter=',')
            # a _csv.reader object containing elements that are lists of strings
            house_rows = [list(map(int,item)) for item in obj]
            for house_values in house_rows:
                result = max_stolen_value(house_values)
                f_out.write(str(result) + '\n')

main()


# Notes
####################################################################

# return maximum sum (stolen_value)
# cannot visit adjacent houses, but otherwise free to rob any house

# The value of each house's goods is put into a list, `h_values`.

# input: h_values = [6,7,1,3,8,2,4]
#                    *   *   *   *    stolen_value = 19

# input: h_values= [5,3,4,11,2]
#                    *     *          stolen_value = 16

# given a list with a solution, what happens if we add another house?
# [ x1, x2, x3, x4, x5 ]
# [ x1, x2, x3, x4, x5, x6 ]

# [ 4, 5, 10, 11 ]
#      *      *
# [ 4, 5, 10, 11, 200 ]
#   *     *       *

# [ 4, 5, 10, 11, 24, 25 ]
#      *      *       *
# [ 4, 5, 10, 11, 24, 25, 1000 ]
#   *     *       *       *

# [ 1, 2, 1, 2, 1, 2 ]
#      *     *     *
# [ 1, 2, 1, 2, 1, 2, 1000 ]
#      *     *        *

#  OOOOHHH, I need to consider more than one previous solution!

# [ 4, 5, 10, 11, 24 ]             (soln  n-2)
#   *     *       *
# [ 4, 5, 10, 11, 24, 25 ]         (soln  n-1)
#      *      *       *
# [ 4, 5, 10, 11, 24, 25, 1000 ]   (soln n option 1:  n-1, without last house)
#      *      *       *
# [ 4, 5, 10, 11, 24, 25, 1000 ]   (soln n option 2:  n-2, with last house)
#   *     *       *       *

# Choose the larger of the two options.

