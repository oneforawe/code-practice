#!/usr/bin/env python3
# filename: test_CourseScheduleIII.py

"""
test_CourseScheduleIII.py
~~~~~~~~~~~~~~~~~~~~~~~~~
A script to test the functionality of the code in the file
CourseScheduleIII.py.

To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.
"""

import os
import sys

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
from CourseScheduleIII import Solution


# Test
# -----------------------------------------------------------------------------

def test_a():
    soln = Solution()
    assert soln.scheduleCourse() == 

