#!/usr/bin/env python3
# filename: CourseSchedule.py
# purpose: Solve leetcode problem 207 "Course Schedule".


"""
CourseSchedule.py
~~~~~~~~~~~~~~~~~
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
python3 CourseSchedule.py Input.txt
"""

import os
import sys
import ast
from typing import List


class Solution:

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        """Return True if prerequisites are possible to accomplish ("canFinish")
        and return False if they're not possible to accomplish."""

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
            return True
        else:
            # It was not possible to accomplish all prerequisites.
            return False


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

Further Questions:
    1) are any of the prerequisites redundant?
       eg:  3, [[1,0],[2,0],[2,1]]
            [2,0] is redundant; can rewrite as
            3, [[1,0],[2,1]]
    2) what is the cycle found?
    3) how many cycles are there?
    4) what is a possible course plan (order of classes to take)?
    5) what are all possible course plans?

                           [course, prerequisite]
6,   prerequisites     = [ [1,0], [3,2], [5,2], [1,4], [1,5] ]  # edges
-->  path_segments     = [ [0,1], [2,3], [2,5], [4,1], [5,1] ]  # edges
     nonstart_classes  = {1,3,5}
     starting_classes  = {0,2,4}
     prereqs_organized = { 1:[0,4,5], 3:[2], 5:[2] }

Kahn's algorithm -- given a "level" of a student, pick off all open classes (ie,
                    those with no prereqs or with already satisfied prereqs) and
                    add them to a list of taken classes;
                    then at this new "level" ignore connections to the already-
                    taken classes and repeat: pick off all open classes and add
                    to list of taken classes;
                    if at any point there are still classes but none that are
                    open, then there is a cycle and the classes can't be
                    finished,
                    otherwise, they can be finished.

                    Can accomplish this with a list of in-degrees for each node,
                    decrementing the in-degree when the prereq courses are
                    taken (or accounted for).


6,   prerequisites     = [ [1,0], [3,2], [5,2], [1,4], [1,5] ]  # edges
                         classes    = [ 0, 1, 2, 3, 4, 5 ]
                         in_degrees = [ 0, 3, 0, 1, 0, 1 ]
a_course_of_study = [ 0, 2, 4 ]       (adding all with in_degree = 0)
  using 0 to decrement:  in_degrees = [ 0, 2, 0, 1, 0, 1 ]   (no more zeros)
  using 2 to decrement:  in_degrees = [ 0, 2, 0, 0, 0, 0 ]   (two new zeros)
a_course_of_study = [ 0, 2, 4, 3, 5 ]
  using 4 to decrement:  in_degrees = [ 0, 1, 0, 0, 0, 0 ]   (no more zeros)
  using 3 to decrement:  in_degrees = [ 0, 1, 0, 0, 0, 0 ]   (no more zeros)
  using 5 to decrement:  in_degrees = [ 0, 0, 0, 0, 0, 0 ]   (one new zero)
a_course_of_study = [ 0, 2, 4, 3, 5, 1 ]


7,   prerequisites     = [ [1,0], [2,0], [3,0], [2,1], [3,5], [4,6], [5,4], [6,3] ]  # edges
                         classes    = [ 0, 1, 2, 3, 4, 5, 6 ]
                         in_degrees = [ 0, 1, 2, 2, 1, 1, 1 ]
a_course_of_study = [ 0 ]             (adding all with in_degree = 0)
  using 0 to decrement:  in_degrees = [ 0, 0, 1, 1, 1, 1, 1 ]   (one new zero)
a_course_of_study = [ 0, 1 ]
  using 1 to decrement:  in_degrees = [ 0, 0, 0, 1, 1, 1, 1 ]   (one new zero)
a_course_of_study = [ 0, 1, 2 ]
  using 2 to decrement:  in_degrees = [ 0, 0, 0, 1, 1, 1, 1 ]   (no more zeros)

Not able to penetrate remaining graph; there must be a cycle.

Note: this doesn't catch the redundancy: [2,0] is redundant in { [1,0] [2,0] [2,1] }

"""

