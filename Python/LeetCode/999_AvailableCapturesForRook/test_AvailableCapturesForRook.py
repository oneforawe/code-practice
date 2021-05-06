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
    board = [[".",".",".",".",".",".",".","."], \
             [".",".",".","p",".",".",".","."], \
             [".",".",".","R",".",".",".","p"], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".","p",".",".",".","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".",".",".",".",".","."]]
    assert soln.numRookCaptures(board) == 3

def test_b():
    soln = Solution()
    board = [[".",".",".",".",".",".",".","."], \
             [".","p","p","p","p","p",".","."], \
             [".","p","p","B","p","p",".","."], \
             [".","p","B","R","B","p",".","."], \
             [".","p","p","B","p","p",".","."], \
             [".","p","p","p","p","p",".","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".",".",".",".",".","."]]
    assert soln.numRookCaptures(board) == 0

def test_c():
    soln = Solution()
    board = [[".",".",".",".",".",".",".","."], \
             [".",".",".","p",".",".",".","."], \
             [".",".",".","p",".",".",".","."], \
             ["p","p",".","R",".","p","B","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".","B",".",".",".","."], \
             [".",".",".","p",".",".",".","."], \
             [".",".",".",".",".",".",".","."]]
    assert soln.numRookCaptures(board) == 3

def test_d():
    soln = Solution()
    board = [[".",".",".",".",".",".",".","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".",".","B",".",".","."], \
             [".",".",".",".",".",".",".","."], \
             [".",".",".",".",".",".",".","."], \
             ["R",".",".",".",".",".",".","p"]]
    assert soln.numRookCaptures(board) == 1

