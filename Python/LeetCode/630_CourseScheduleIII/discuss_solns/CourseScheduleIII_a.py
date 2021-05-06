#!/usr/bin/env python3
# filename: CourseScheduleIII.py
# purpose: Solve leetcode problem 630 "Course Schedule III".

# Solution from
# https://leetcode.com/problems/course-schedule-iii/discuss/104847/
#  Python-Straightforward-with-Explanation

"""
Sort all the courses by their ending time. When considering the first K
courses, they all end before end. A necessary and sufficient condition
for our schedule to be valid, is that (for all K), the courses we choose
to take within the first K of them, have total duration less than end.

For each K, we will greedily remove the largest-length course until the
total duration start is <= end. To select these largest-length courses,
we will use a max heap. start will maintain the loop invariant that it
is the sum of the lengths of the courses we have currently taken.

Clearly, this greedy choice makes the number of courses used maximal for
each K. When considering potential future K, there's never a case where
we preferred having a longer course to a shorter one, so indeed our
greedy choice dominates all other candidates.
"""

import os
import sys
import ast
from typing import List

import heapq

class Solution:

    # def scheduleCourse(self, courses: List[List[int]]) -> int:

    def scheduleCourse(self, A):
        pq = []
        start = 0
        #for t, end in sorted(A, key = lambda (t, end): end):
        #for t, end in sorted(A, key = lambda [t, end]: end):
        for t, end in sorted(A, key = lambda a: a[1]):
            start += t
            heapq.heappush(pq, -t)
            print(f' (t,end) = ({t},{end}) ; pq = {pq}')
            while start > end:
                start += heapq.heappop(pq)
                print(f' while (start > end)=({start} > {end}) ; pq = {pq}')
        print(pq)
        return len(pq)


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

"""

