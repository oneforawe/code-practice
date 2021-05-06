#!/usr/bin/env python3
## #!/bin/python3

import math
import os
import random
import re
import sys

# Complete the hourglassSum function below.
def hourglassSum(arr):
   max_sum = getSum(arr,1,1)
   for i in range(1,5):
       for j in range(1,5):
           sum = getSum(arr,i,j)
           if sum > max_sum:
               max_sum = sum
   return max_sum


def getSum(arr,i,j):
    sum = arr[i-1][j-1] + arr[i-1][j] + arr[i-1][j+1] + \
          arr[i][j] + \
          arr[i+1][j-1] + arr[i+1][j] + arr[i+1][j+1]
    return sum


if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    arr = []

    # New:
    f = open(sys.argv[1],"r")

    for _ in range(6):
        #arr.append(list(map(int, input().rstrip().split())))
        arr.append(list(map(int, f.readline().rstrip().split())))

    result = hourglassSum(arr)

    fptr.write(str(result) + '\n')

    # New:
    f.close()

    fptr.close()

