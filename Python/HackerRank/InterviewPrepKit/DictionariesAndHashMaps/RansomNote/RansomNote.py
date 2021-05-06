#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the checkMagazine function below.
def checkMagazine(magazine, note):
    wordFreq_m = makeDict(magazine)
    wordFreq_n = makeDict(note)
    # Check that magazine has enough words.
    for word in wordFreq_n:
        if word not in wordFreq_m:
            return "No"
        else:
            if wordFreq_m[word] < wordFreq_n[word]:
                return "No"
            else:
                continue
    return "Yes"


def makeDict(list):
    wordFreq = {}
    for word in list:
        if word not in wordFreq:
            wordFreq[word] = 1
        else:
            wordFreq[word] += 1
    return wordFreq


if __name__ == '__main__':

    # New:
    os.environ['OUTPUT_PATH'] = "./Output.txt"

    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    # New:
    f = open(sys.argv[1],"r")

    #mn = input().split()
    mn = f.readline().split()

    m = int(mn[0])

    n = int(mn[1])

    #magazine = input().rstrip().split()
    magazine = f.readline().rstrip().split()

    #note = input().rstrip().split()
    note = f.readline().rstrip().split()

    # New:
    f.close()

    result = checkMagazine(magazine, note)

    fptr.write(str(result) + '\n')

    fptr.close()

