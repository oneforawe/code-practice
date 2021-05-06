#!/usr/bin/env python3
# filename: CourseScheduleIII.py
# purpose: Solve leetcode problem 630 "Course Schedule III".


"""
CourseScheduleIII.py
~~~~~~~~~~~~~~~~~~~~
Given n courses represented by pairs [t = duration, d = closing day],
your task is to find the maximal number of courses that can be taken.
(Perhaps t is for "time" and d is for "deadline".)

You start on day 1 and can only take one course at a time. A course
should be taken continuously for t days and must be finished before or
on the dth day.

Example:
Input: [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]
Output: 3
Explanation:
Of 4 courses, you can take 3 courses at most:
* First, take the 1st course -- it takes 100 days so you'll finish it on
  the 100th day and be ready to take the next course on the 101st day.
* Second, take the 3rd course -- it takes 1000 days so you'll finish it
  on the 1100th day and be ready to take the next course on the 1101st
  day.
* Third, take the 2nd course -- it takes 200 days so you'll finish it on
  the 1300th day.
* The 4th course cannot be taken now, since you'll finish it on the
  3300th day, which is past the closing day.

Note:
The integer 1 <= d, t, n <= 10,000.


To operate, execute the following in a shell terminal:
python3 CourseScheduleIII.py Input.txt
"""

import os
import sys
import ast
from typing import List


class Solution:

    def scheduleCourse(self, courses: List[List[int]]) -> int:
        return -1


def main():
    """Apply canFinish() to input file, print to output file and
    screen."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            courses = ast.literal_eval(line.rstrip())
            result = soln.scheduleCourse(courses)
            output_str = line + str(result) + '\n'
            file_out.write(output_str + '\n')
            print(output_str)


if __name__ == '__main__':
    main()


"""
Notes

[[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]
3

[[2,10], [2,4], [2,7], [8,9], [10,11]]


closing days
------------------------------------------------------------------------
       |
              |
                                      |
                                                          |
                                                                       |


"""

