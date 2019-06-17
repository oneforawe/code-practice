#!/usr/bin/env python3
# filename: test_TwoSum.py

"""
test_TwoSum.py
~~~~~~~~~~~~~~
A script to test the functionality of the code in the file
TwoSum.py.

To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.
"""

import os
import sys

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
from TwoSum import Solution


# Sums
# -----------------------------------------------------------------------------

def test_a():
    soln = Solution()
    assert soln.twoSum([2, 7, 11, 15], 9) == [0, 1]

def test_b():
    soln = Solution()
    assert soln.twoSum([1, 2, 3, 4, 5], 8) == [2, 4]

