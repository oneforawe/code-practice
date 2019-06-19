#!/usr/bin/env python3
# filename: CourseSchedule.py
# purpose: Solve leetcode problem 207 "CourseSchedule".


"""
CourseSchedule.py
~~~~~~~
There are a total of n courses you have to take, labeled from 0 to n-1.

Some courses may have prerequisites, for example to take course 0 you
have to first take course 1, which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, is
it possible for you to finish all courses?

Example 1:
Input: 2, [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take.
             To take course 1 you should have finished course 0.
             So it is possible.

Example 2:
Input: 2, [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take.
             To take course 1 you should have finished course 0, and to
             take course 0 you should also have finished course 1.
             So it is impossible.

Note:
The input prerequisites is a graph represented by a list of edges, not
adjacency matrices. Read more about how a graph is represented. You may
assume that there are no duplicate edges in the input prerequisites.


To operate, execute the following in a shell terminal:
python3 3Sum.py Input.txt
"""

import os
import sys
import ast
from typing import List


class Solution:

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        pass
        return True


def main():
    """Apply canFinish() to input file, print to output file and
    screen."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            num_str, prereqs_str = line.split(', ')
            num = int(num_str)
            prereqs = ast.literal_eval(prereqs_str)
            result = soln.canFinish(num, prereqs)
            output_str = line + str(result) + '\n'
            file_out.write(output_str + '\n')
            print(output_str)


if __name__ == '__main__':
    main()


"""
Notes

"""

