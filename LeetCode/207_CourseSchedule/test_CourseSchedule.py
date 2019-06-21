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
    assert soln.canFinish(2, [[1,0]]) == True

def test_b():
    soln = Solution()
    assert soln.canFinish(2, [[1,0],[0,1]]) == False

def test_c():
    soln = Solution()
    assert soln.canFinish(4, [[1,0],[2,1],[3,2],[1,3]]) == False

def test_d():
    soln = Solution()
    assert soln.canFinish(6, [[1,0],[3,2],[5,2],[1,4],[1,5]]) == True

def test_e():
    soln = Solution()
    assert soln.canFinish(6, [[1,0],[5,2],[3,5],[4,3],[2,4]]) == False

def test_f():
    soln = Solution()
    assert soln.canFinish(6, [[1,0],[2,0],[3,0],[4,0],[5,0],[2,1],[5,4]]) == True

def test_g():
    soln = Solution()
    assert soln.canFinish(6, [[1,0],[1,4],[1,5],[3,2],[5,2]]) == True

def test_h():
    soln = Solution()
    assert soln.canFinish(6, [[2,0],[3,1],[4,2],[5,2],[5,3]]) == True

def test_j():
    soln = Solution()
    assert soln.canFinish(9, [[2,0],[2,1],[3,0],[3,1],[4,2],[5,3],[6,5],[7,5],[8,4],[8,6],[8,7]]) == True


"""
Alternative formulation consideration

# Prepare solution instance and inputs for tests
soln = Solution()
Inputs = list()
for line in open('Input.txt', 'r'):
    num_str, prereqs_str = line.split(', ')
    num = int(num_str)
    prereqs = ast.literal_eval(prereqs_str)
    Inputs.append([num, prereqs])


# Test Prerequisites for Non-Contradiction
# -----------------------------------------------------------------------------

# do a for loop over all inputs?  define tests as lambda functions?

def test_a():
    assert soln.canFinish(Inputs[0][0], Inputs[0][1]) == 

def test_b():
    assert soln.canFinish() == 

def test_c():
    assert soln.canFinish() == 

"""
