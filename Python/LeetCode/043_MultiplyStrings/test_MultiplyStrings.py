#!/usr/bin/env python3
# filename: test_MultiplyStrings.py

"""
test_MultiplyStrings.py
~~~~~~~~~~~~~~~~~~~~~~~
A script to test the functionality of the code in the file
MultiplyStrings.py.

To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.
"""

import os
import sys

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
from MultiplyStrings import Solution


# Sums
# -----------------------------------------------------------------------------

def test_a():
    soln = Solution()
    assert soln.multiply('0', '0') == '0'

def test_b():
    soln = Solution()
    assert soln.multiply('0', '1') == '0'

def test_c():
    soln = Solution()
    assert soln.multiply('1', '0') == '0'

def test_d():
    soln = Solution()
    assert soln.multiply('2', '3') == '6'

def test_e():
    soln = Solution()
    assert soln.multiply('123', '456') == '56088'

