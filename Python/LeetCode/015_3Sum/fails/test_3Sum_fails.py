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
# All these commented-out attempts are records of failed attempts
#from 3Sum import Solution # module name can't start with a number (3)
#importlib.import_module('3Sum', package=None)
ThreeSum = importlib.import_module('3Sum', package=None)
#Solution = getattr(ThreeSum, Solution)
Solution = getattr(ThreeSum, 'Solution')
#importlib.import_module('3Sum', package=None) as tsum
#importlib.import_module('3Sum.Solution', package=None)
#importlib.import_module('.3Sum.Solution', package=None)
#Solution = getattr('3Sum', 'Solution')
#Solution = getattr(3Sum, 'Solution')
#Solution = getattr('3Sum', Solution)
#Solution = getattr(3Sum, Solution)


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

