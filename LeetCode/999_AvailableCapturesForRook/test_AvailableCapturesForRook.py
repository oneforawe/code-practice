#!/usr/bin/env python3
# filename: test_AvailableCapturesForRook.py

"""
test_AvailableCapturesForRook.py
~~~~~~~~~~~~~~~~~~~~~~~
A script to test the functionality of the code in the file
AvailableCapturesForRook.py.

To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.
"""

import os
import sys

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
from AvailableCapturesForRook import Solution


# Sums
# -----------------------------------------------------------------------------

def test_a():
    soln = Solution()
    assert soln.numRookCaptures('0', '0') == '0'

def test_b():
    soln = Solution()
    assert soln.numRookCaptures('0', '1') == '0'

def test_c():
    soln = Solution()
    assert soln.numRookCaptures('1', '0') == '0'

def test_d():
    soln = Solution()
    assert soln.numRookCaptures('2', '3') == '6'

def test_e():
    soln = Solution()
    assert soln.numRookCaptures('123', '456') == '56088'

