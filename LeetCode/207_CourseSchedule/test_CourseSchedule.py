#!/usr/bin/env python3
# filename: test_CourseSchedule.py

"""
test_CourseSchedule.py
~~~~~~~~~~~~~~~~~~~~~~
A script to test the functionality of the code in the file
CourseSchedule.py.

To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.
"""

import os
import sys

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
from CourseSchedule import Solution


# Test Prerequisites for Non-Contradiction
# -----------------------------------------------------------------------------

def test_a():
    soln = Solution()
    assert soln.canFinish() == 

def test_b():
    soln = Solution()
    assert soln.canFinish() == 

def test_c():
    soln = Solution()
    assert soln.canFinish() == 

