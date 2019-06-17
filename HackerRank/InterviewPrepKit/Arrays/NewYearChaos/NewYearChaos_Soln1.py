#!/usr/bin/env python3
## #!/bin/python3

import math
import os
import random
import re
import sys

"""
NEARLY CORRECT, BUT NOT CORRECT: (only accounts for easy-to-count bribes)

# Complete the minimumBribes function below.
def minimumBribes(q):
    bribes = 0
    for i, orig_place in enumerate(q):
        new_place = i+1
        diff = orig_place - new_place
        if diff >= 0:
            if diff <= 2:
                bribes += diff
            else:
                bribes = "Too chaotic"
                break
    print(bribes)
    return bribes
"""

# Complete the minimumBribes function below.
def minimumBribes(n,q):
    bribes = 0
    old_place = q
    print(f'  old_place      = {old_place}')
    new_place = list(range(1,n+1))
    print(f'  new_place      = {new_place}')
    # diff = old_place - new_place
    diff = [i - j for i, j in zip(old_place, new_place)]
    print(f'  diff           = {diff}')
    fell_back = []
    fell_back_count = 0
    for i,change in enumerate(diff):
        # Count easy-to-count bribes
        # (ie, those that moved forward)
        if change > 0:
            fell_back.append(0)
            if change <= 2:
                bribes += change
            else:
                print("Too chaotic")
                return "Too chaotic"
        # Prepare to
        # count hard-to-count bribes
        # (ie, those that fell back and moved forward)
        if change <= 0:
            fell_back_count += 1
            fell_back.append(0)
            fell_back[i+change] = fell_back_count
    print(f'  fell_back      = {fell_back}')

    # Prepare more..
    fell_back_ref = []
    fell_back_ref_count = 0
    for number in fell_back:
        if number > 0:
            fell_back_ref_count += 1
            fell_back_ref.append(fell_back_ref_count)
        else:
            fell_back_ref.append(0)
    print(f'  fell_back_ref  = {fell_back_ref}')

    # Prepare more..
    # fell_back_diff = fell_back_ref - fell_back
    fell_back_diff = [i - j for i, j in zip(fell_back_ref, fell_back)]
    print(f'  fell_back_diff = {fell_back_diff}')

    # Count
    for change in fell_back_diff:
        if change > 0:
            if change <= 2:
                bribes += change
            else:
                print("Too chaotic")
                return "Too chaotic"

    print(bribes)
    return bribes


if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"
    fptr = open(os.environ['OUTPUT_PATH'], 'w')
    f = open(sys.argv[1],"r")

    #t = int(input())
    t = int(f.readline())

    for t_itr in range(t):
        #n = int(input())
        n = int(f.readline())
        #q = list(map(int, input().rstrip().split()))
        q = list(map(int, f.readline().rstrip().split()))
        #minimumBribes(q)
        result = minimumBribes(n,q)
        # New:
        fptr.write(str(result) + '\n')

    # New:
    f.close()
    fptr.close()

