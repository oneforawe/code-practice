#!/usr/bin/env python3
## #!/bin/python3


import math
import os
import random
import re
import sys

# Complete the repeatedString function below.
def repeatedString(s, n):
    print(f's = {s}')
    print(f'n = {n}')
    # Assume s is non-empty (m!=0)
    m = len(s)
    print(f'm = {m}')
    print(f's[0] = {s[0]}')
    print(f's[1] = {s[1]}')
    print(f's[2] = {s[2]}')
    print(f's[3] = {s[3]}')
    # How many whole "s"s are involved?
    num_s = math.floor(n/m)
    print(f'num_s = {num_s}')
    # How many characters in a partial "s"?
    rem_char = n%m
    print(f'rem_char = {rem_char}')
    # How many "a"s are in this partial "s"?
    as_in_partial = as_in_string(s[:rem_char])
    print(f's[:rem_char] = {s[:rem_char]}')
    print(f'as_in_partial = {as_in_partial}')
    # How many "a"s are in a whole "s"?
    as_in_s = as_in_partial + as_in_string(s[rem_char:])
    print(f's[rem_char:] = {s[rem_char:]}')
    print(f'as_in_s = {as_in_s}')

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

    print(sys.argv)

    #s = input()
    s = f.readline()
    # FIX:
    #s = f.readline().rstrip('\n')

    #n = int(input())
    n = int(f.readline())

    result = repeatedString(s, n)

    fptr.write(str(result) + '\n')

    # New:
    f.close()

    fptr.close()

