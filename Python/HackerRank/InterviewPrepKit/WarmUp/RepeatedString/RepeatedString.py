#!/usr/bin/env python3
## #!/bin/python3

import math
import os
import random
import re
import sys

# Complete the repeatedString function below.
def repeatedString(s, n):
    # Assume s is non-empty (m!=0)
    m = len(s)
    # How many whole "s"s are involved?
    num_s = int(math.floor(n/m))
    # How many characters in a partial "s"?
    rem_char = int(n%m)
    # How many "a"s are in this partial "s"?
    as_in_partial = as_in_string(s[:rem_char])
    # How many "a"s are in a whole "s"?
    as_in_s = as_in_partial + as_in_string(s[rem_char:])

    # Total number of "a"s in the n-long string
    tot_as = num_s*as_in_s + as_in_partial

    return tot_as


def as_in_string(string):
    num_as = 0
    for char in string:
        if char == "a":
            num_as += 1
    return num_as


if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    # New:
    f = open(sys.argv[1],"r")

    #s = input()
    s = f.readline().rstrip('\n')

    #n = int(input())
    n = int(f.readline())

    result = repeatedString(s, n)

    fptr.write(str(result) + '\n')

    # New:
    f.close()

    fptr.close()

