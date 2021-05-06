#!/usr/bin/env python3
# filename: test_3Sum.py

"""
test_3Sum.py
~~~~~~~~~~~~~~~~~~
A script to test the functionality of the code in the file
3Sum.py.

To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.
"""

import os
import sys
import importlib

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
ThreeSum = importlib.import_module('3Sum', package=None)
Solution = getattr(ThreeSum, 'Solution')


# Triples
# -----------------------------------------------------------------------------

def test_a():
    soln = Solution()
    assert soln.threeSum([-1, 0, 1, 2, -1, -4]) == [[-1, 0, 1], [-1, -1, 2]]

def test_b():
    soln = Solution()
    assert soln.threeSum([1, 1, -2, 2, -4, 2]) == [[-2, 1, 1], [-4, 2, 2]]

def test_c():
    soln = Solution()
    assert soln.threeSum([3, -2, 6, -4, -1, 1, 5, -9]) == \
        [[-2, -1, 3], [-9, 3, 6], [-4, 1, 3], [-4, -2, 6], [-4, -1, 5]]

