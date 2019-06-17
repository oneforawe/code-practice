#!/usr/bin/env python3
# filename: test_AddStrings.py

"""
test_AddStrings.py
~~~~~~~~~~~~~~~
A script to test the functionality of the code in the file
AddStrings.py.

To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.
"""

import os
import sys

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
from AddStrings import Solution


# Sums
# -----------------------------------------------------------------------------

def test_a():
    soln = Solution()
    assert soln.addStrings('0', '0') == '0'

def test_b():
    soln = Solution()
    assert soln.addStrings('0', '1') == '1'

def test_c():
    soln = Solution()
    assert soln.addStrings('1', '0') == '1'

def test_d():
    soln = Solution()
    assert soln.addStrings('1', '99') == '100'

def test_e():
    soln = Solution()
    assert soln.addStrings('99', '1') == '100'

def test_f():
    soln = Solution()
    assert soln.addStrings('123', '321') == '444'

def test_g():
    soln = Solution()
    assert soln.addStrings('999', '999') == '1998'

def test_h():
    soln = Solution()
    assert soln.addStrings('999', '1') == '1000'

def test_i():
    soln = Solution()
    assert soln.addStrings('1', '999') == '1000'

def test_j():
    soln = Solution()
    assert soln.addStrings('287450329845672', '39') == '287450329845711'

