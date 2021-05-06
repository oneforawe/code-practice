#!/usr/bin/env python3
## #!/bin/python3

import math
import os
import random
import re
import sys

"""
Abbreviated version:

def jumpingOnClouds(c):
    jump_count = 0
    index = 0
    while index <= len(c)-3:
        if c[index+1] == 0:
            if c[index+2] == 0:
                index += 2
            else:
                index += 1
        else:
            index += 2
        jump_count += 1
    if index == len(c)-2:
        jump_count += 1
    return jump_count
"""


# Complete the jumpingOnClouds function below.
def jumpingOnClouds(c):
    # Cumulus cloud (safe) = 0
    # Thunderhead (avoid) = 1
    # Assuming there is a solution, Emma needs
    # to always jump 2 ahead when possible
    # and 1 ahead when not.
    jump_count = 0
    index = 0 # starting at first cloud
    while index <= len(c)-3:
        if c[index+1] == 0:
            # Can jump to next, but what about further?
            if c[index+2] == 0:
                # Can jump by 2
                index += 2
            else:
                # Can only jump by 1
                index += 1
        else:
            # Can't jump to next; must jump over.
            index += 2
        jump_count += 1
    # If at index len(c)-2 (2nd to last)
    if index == len(c)-2:
        # Must jump once more
        jump_count += 1

    return jump_count


if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    # New:
    f = open(sys.argv[1],"r")

    #n = int(input())
    n = int(f.readline())

    #c = list(map(int, input().rstrip().split()))
    c = list(map(int, f.readline().rstrip().split()))

    result = jumpingOnClouds(c)

    fptr.write(str(result) + '\n')

    # New:
    f.close()

    fptr.close()

