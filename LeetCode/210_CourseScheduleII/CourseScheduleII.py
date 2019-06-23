#!/usr/bin/env python3
# filename: CourseScheduleII.py
# purpose: Solve leetcode problem 210 "Course Schedule II".


"""
CourseScheduleII.py
~~~~~~~~~~~~~~~~~~~
There are a total of n courses you have to take, labeled from 0 to n-1.

Some courses may have prerequisites, for example to take course 0 you
have to first take course 1, which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs,
return the ordering of courses you should take to finish all courses.

There may be multiple correct orders, you just need to return one of
them. If it is impossible to finish all courses, return an empty array.

Example 1:
Input: 2, [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1
             you should have finished course 0. So the correct course
             order is [0,1].

Example 2:
Input: 4, [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3] or [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3
             you should have finished both courses 1 and 2. Both courses
             1 and 2 should be taken after you finished course 0. So one
             correct course order is [0,1,2,3]. Another correct ordering
             is [0,2,1,3].

Note:
The input prerequisites is a graph represented by a list of edges, not
adjacency matrices. Read more about how a graph is represented. You may
assume that there are no duplicate edges in the input prerequisites.


To operate, execute the following in a shell terminal:
python3 CourseScheduleII.py Input.txt
"""

import os
import sys
import ast
from typing import List


class Solution:

    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        """Return a valid sequence of courses (`taken_courses`) that satisfy the
        prerequisites, if such a sequence is possible; otherwise return an empty
        list."""

        # The `prerequisites` list of course relationships can be seen as
        # representing links or edges in a directed graph, where the courses are
        # the nodes or vertices in the graph.  If the prerequisites are not
        # possible to accomplish, this implies there's a cycle in the graph.
        # Otherwise, if they are possible to accomplish, the graph is a DAG - a
        # directed acyclic graph.  Finding a valid sequence of courses is
        # equivalent to performing a topological sort of the graph.

        # Initialize a list for a (valid) sequence of courses.
        taken_courses = list()
        # Calculate the number of prereqs (or "in-degrees") for each course.
        num_prereqs = [0] * numCourses
        for pair in prerequisites:
            course = pair[0]
            #prereq = pair[1] # We don't care which prereqs they are now.
            num_prereqs[course] += 1

        # Take initially-available courses (add them to course-sequence).
        for course in range(numCourses):
            if num_prereqs[course] == 0:
                taken_courses.append(course)

        # With the taken courses so far, see if prereqs are met
        # for any additional courses, and then take those available courses.
        i = 0
        while i < len(taken_courses):
            taken_course = taken_courses[i]
            for pair in prerequisites:
                untaken_course = pair[0]
                prereq_for_untaken = pair[1]
                if taken_course == prereq_for_untaken:
                    num_prereqs[untaken_course] -= 1
                    if num_prereqs[untaken_course] == 0:
                        # If no more prereqs, take the course.
                        taken_courses.append(untaken_course)
            # Step to next taken-course (if there is one).
            i += 1

        # If at any point there are remaining courses to be taken and there are
        # unmet prereqs for those courses (so that these remaining courses can't
        # be added to the taken-courses list), that means that it's impossible
        # to take all the courses.
        if len(taken_courses) == numCourses:
            # It was possible to accomplish all prerequisites.
            return taken_courses
        else:
            # It was not possible to accomplish all prerequisites.
            return list()


def main():
    """Apply findOrder() to input file, print to output file and
    screen."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            num_str, prereqs_str = line.split(', ')
            num = int(num_str)
            prereqs = ast.literal_eval(prereqs_str)
            result = soln.findOrder(num, prereqs)
            output_str = line + str(result) + '\n'
            file_out.write(output_str + '\n')
            print(output_str)


if __name__ == '__main__':
    main()


"""
Notes

Modify code from problem 207 "Course Schedule" to display `taken_courses` or an
empty array/list.

"""

