#!/usr/bin/env python3
# filename: LeftRotation.py

import math
import os
import random
import re
import sys

# Complete the rotLeft function below.
def rotLeft(n, a, d):
    start = d % n
    rotated = a[start:] + a[:start]
    return rotated


if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    # New:
    f = open(sys.argv[1],"r")

    #nd = input().split()
    nd = f.readline().split()

    n = int(nd[0])

    d = int(nd[1])

    #a = list(map(int, input().rstrip().split()))
    a = list(map(int, f.readline().rstrip().split()))

    result = rotLeft(n, a, d)

    fptr.write(' '.join(map(str, result)))
    fptr.write('\n')

    # New:
    f.close()

    fptr.close()

