#!/usr/bin/env python3
# filename: notes.py
# purpose: Show some of my early thinking on this problem.

import os
import sys
import ast
from typing import List


class Solution:

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        """Return True if prerequisites are possible to accomplish ("can Finish")
        with no cycles (ie, prerequisites is a dag - directed acyclic graph);
        otherwise, if a cycle is found, return False."""
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

Questions:
    1) are any of the prerequisites redundant?
       eg:  3, [[1,0],[2,0],[2,1]]
            [2,0] is redundant; can rewrite as
            3, [[1,0],[2,1]]
    2) what is the cycle found?
    3) how many cycles are there?
    4) what is a possible course plan (order of classes to take)?
    5) what are all possible course plans?

Temporary notes:

2, [[1,0]]
True

2, [[1,0],[0,1]]
False

6, [[1,0],[3,2],[5,2],[1,4],[1,5]]
True

6, [[2,0],[5,2],[3,5],[4,3],[2,4]]
False


BFS: ?
DFS: ?


1st Pass: Which courses have prereqs and which do not?
          (if all courses have a prereq, then not-possible)
          Create structure (dictionary?) that contains each course with
          all of its prereqs:

          6, [[1,0],[3,2],[5,2],[1,4],[1,5]]
          -->  { 1:[0,4,5], 3:[2], 5:[2] }

          6, [[2,0],[5,2],[3,5],[4,3],[2,4]]
          -->  { 2:[0,4], 5:[2], 3:[5], 4:[3] }

2nd Pass: With structure (dictionary?) search through all paths to see
          if there's a repeat (cycle) in a given path.
          (Searching all paths means passing through and checking off all edges,
          but making sure to distinguish different paths passing through the
          same edge.)

          6,   [ [1,0], [3,2], [5,2], [1,4], [1,5] ]
          -->  [ False, False, False, False, False ]
          and  { 1:[0,4,5], 3:[2], 5:[2] }

          6,   [ [2,0], [5,2], [3,5], [4,3], [2,4] ]
          -->  [ False, False, False, False, False ]
          and  { 2:[0,4], 5:[2], 3:[5], 4:[3] }

          1,0  1,4  1,5 5,2  3,2

          2,0  2,4 4,3 3,5 5,2

          path 1:   2 > 0                     path 2[0]
                                               one of two 2-branching paths
          path 2:   2 > 4 > 3 > 5 > 2         path 2[1] 4[0] 3[0] 5[0]
                            (repeat!)          one of two 2-branching paths
                                               with all next steps unique

                                               thus there are only two 2-paths


Previous idea:

          -->  [ False, False, False, False, False ]
          or   { 1:[False, [ [0, False], [4, False], [5, False] ] ],
                 3:[False, [ [2, False] ] ],
                 5:[False, [ [2, False] ] ] }

          and  [ False, False, False, False, False ]
          or   { 2:[False, [ [0, False], [4, False] ] ],
                 5:[False, [ [2, False] ] ],
                 3:[False, [ [5, False] ] ],
                 4:[False, [ [3, False] ] ] }

CONSIDER:

6,   prerequisites     = [ [1,0], [3,2], [5,2], [1,4], [1,5] ]  # edges
-->  path_segments     = [ [0,1], [2,3], [2,5], [4,1], [5,1] ]  # edges
     nonstart_classes  = {1,3,5}
     starting_classes  = {0,2,4}
     prereqs_organized = { 1:[0,4,5], 3:[2], 5:[2] }

Let "path" refer to a linked sequence of classes connecting a each class with a
prerequisite (in forward or reverse order).

paths  { 1:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[1,0]},
                 {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[1,4]},
                 {'Traversed':False, 'Path_Type':'Compound', 'Path_Record':Incomplete, 'Path':[1,5]}
               ],
             'Num_of_Paths':'Unknown',
             'Traversed_All':False
           },
         3:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[3,2]}
               ],
             'Num_of_Paths':1,
             'Traversed_All':True
           },
         5:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[5,2]}
               ],
             'Num_of_Paths':1,
             'Traversed_All':True
            }
       }

GOES TO

paths  { 1:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[1,0]},
                 {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[1,4]},
                 {'Traversed':True,  'Path_Type':'Compound', 'Path_Record':Complete,   'Path':[1,5,2]}
               ],
             'Num_of_Paths':3,
             'Traversed_All':True
           },
         3:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[3,2]}
               ],
             'Num_of_Paths':1,
             'Traversed_All':True
           },
         5:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[5,2]}
               ],
             'Num_of_Paths':1,
             'Traversed_All':True
            }
       }


AND CAN COMPRESS INTO MAIN PATHS

main_paths   (forward now)
       { 1:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[0,1]},
                 {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[4,1]},
                 {'Traversed':True,  'Path_Type':'Compound', 'Path_Record':Complete,   'Path':[2,5,1]}
               ],
             'Num_of_Paths':3,
             'Traversed_All':True
           },
         3:{ 'Path_List':
               [ {'Traversed':True,  'Path_Type':'Simple',   'Path_Record':Complete,   'Path':[2,3]}
               ],
             'Num_of_Paths':1,
             'Traversed_All':True
           }
       }

6,   prerequisites     = [ [1,0], [3,2], [5,2], [1,4], [1,5] ]  # edges
-->  nonstart_classes  = {1,3,5}
     starting_classes  = {0,2,4}
     prereqs_organized = { 1:[0,4,5], 3:[2], 5:[2] }



"""

