#!/usr/bin/env python3
# filename: test_TestImportation.py
# purpose: Show how to do an import for a test file.

"""
test_file.py
~~~~~~~~~~~~
To run the tests herein, execute the following in a shell terminal*:
pytest

*And be sure there is an __init__.py file in the same directory.

(First implemented this sort of code in a LeetCode problem; possibly
#207, with test_CourseSchedule.py)
"""

import os
import sys

module_dir = os.path.dirname(__file__)
sys.path.append(os.path.join(module_dir, '.'))
from TestImportation import add_these


# Test Prerequisites for Non-Contradiction
# -----------------------------------------------------------------------------

def test_a():
    assert add_these(3, 7) == 10


