#!/usr/env/python3
# filename: burglar_2.py

"""
burglar_2.py
~~~~~~~~~~~~
This script contains a solution to the "burglar" problem, where a burglar steals
the largest amount possible from a row of houses while not robbing adjacent
houses.  This solution is achieved iteratively, building the final solution
starting from the "smallest solution" and working up.
"""

import os
import sys
import csv

def max_stolen_value(h_values:list) -> int:
    # `prev` and `curr` are variables representing two possible options for a
    # sum of how much has been stolen from the houses, as we examine the values
    # house-by-house
    prev, curr = 0, 0
    for val in h_values:
        # With respect to the new current sum `curr`, there are two previous
        # sums: `curr` (immediately previous) and `prev` (the sum before that)
        prev, curr = curr, max(prev + val, curr)
    return curr

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

# Can build solution going house-by-house, keeping track of two options
# determined by the previous two "solutions"

# f = max_stolen_value
# nums = h_values

# f(0) = nums[0]
# f(1) = max(nums[0], nums[1])
# f(k) = max( f(k-2) + nums[k], f(k-1) )    for k >= 2

