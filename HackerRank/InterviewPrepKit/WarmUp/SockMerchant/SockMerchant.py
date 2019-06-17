#!/usr/bin/env python3
## #!/bin/python3

import math
import os
import random
import re
import sys

# Complete the sockMerchant function below.
def sockMerchant(n, ar):
    colors = []       # a list of the unique "colors" of socks, represented by
                      #  unique integers between 1 and 100 (inclusive)
    nums_socks = []   # a corresponding list of the number of socks for each
                      #  unique color (ie, the numbers of socks)
    for color in ar:
        if color not in colors:
            colors.append(color)
            nums_socks.append(1)
        else:
            nums_socks[colors.index(color)] += 1
    pairs = 0
    for num_socks in nums_socks:
        pairs += math.floor(num_socks/2)
    return pairs

if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    # New:
    f = open(sys.argv[1],"r")

    #n = int(input())
    n = int(f.readline())

    #ar = list(map(int, input().rstrip().split()))
    ar = list(map(int, f.readline().rstrip().split()))

    result = sockMerchant(n, ar)

    fptr.write(str(result) + '\n')

    # New:
    f.close()

    fptr.close()
