#!/usr/bin/env python3
## #!/bin/python3

import math
import os
import random
import re
import sys

# Complete the countingValleys function below.
def countingValleys(n, s):
    elevation = 0
    valley_count = 0
    for char in s:
        if char == "U":
            elevation += 1
            if elevation == 0:
                valley_count += 1
        if char == "D":
            elevation -= 1
    return valley_count


if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    # New:
    f = open(sys.argv[1],"r")

    #n = int(input())
    n = int(f.readline())

    #s = input()
    s = f.readline()

    result = countingValleys(n, s)

    fptr.write(str(result) + '\n')

    # New:
    f.close()

    fptr.close()

