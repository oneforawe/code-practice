#!/usr/bin/env python3
# filename: template.py
# purpose: To solve a HackerRank.com problem: 123 "Name of Problem".

"""
template.py
~~~~~~~~~~~
A python file to do a thing requested by the problem.

To operate, execute the following in a shell terminal:
python3 template.py Input.txt
"""

import os
import sys
import math
import random


def function_name(n, s):
    """Do a thing."""
    pass


def main():
    """Apply function_name to input file, outputing to output file."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            word1, word2 = tuple(line.rstrip().split())
            result = soln.function_name(word1, word2)
            file_out.write(str(result) + '\n')

def main():
    """Apply function_name to input file, outputing to output file."""
    with open(sys.argv[1], 'r') as file_in:
        n = int(file_in.readline())
        s = file_in.readline()
    with open('Output.txt', 'w') as file_out:
        result = function_name(n, s)
        file_out.write(str(result) + '\n')


if __name__ == '__main__':
    main()

