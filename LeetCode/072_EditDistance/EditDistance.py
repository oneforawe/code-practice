#!/usr/bin/env python3
# filename: EditDistance.py
# purpose: Solve leetcode problem 072 "Edit Distance".


"""
EditDistance.py
~~~~~~~~~~~~~~~
Given two words, word1 and word2, and three permitted kinds of
operations (delete character, insert character, replace character), find
the minimum number of operations required to convert word1 into word2 --
i.e., find the minimum 'edit-distance' between the two words.

To operate, execute the following in a shell terminal:
python3 EditDistance.py Input.txt
"""

import os
import sys


class Solution:

    def minDistance(self, word1: str, word2: str) -> int:
        """Find the minimum 'edit-distance' between two words."""
        # First find the maximal overlap - the longest matching substring,
        # which can be non-contiguous.
        pass
        return 2


def main():
    """Apply minDistance() to input file, outputing to output file."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        for line in open(sys.argv[1], 'r'):
            word1, word2 = tuple(line.rstrip().split())
            result = soln.minDistance(word1, word2)
            file_out.write(word1 + ' ' + word2 + ' ' + str(result) + '\n')


if __name__ == '__main__':
    main()


"""
Notes

Examples:

horse ros 3            overlap: _o___  __r__  ___s_  contiguous
                                _o_s_                non-contiguous and exploded
intention execution 5  overlap:  ___e__tion          non-contiguous and exploded
pumpnickle nickle 4    overlap: ____nickle
shamblam blamsham 4    overlap: ____sham____  ____blam____  contiguous
                                __am__am    non-contiguous but in-place (non-exploded)



horse  horse  horse  horse  horse  horse  horse  horse  horse  horse  horse
ros    ros__  ro_s_  ro__s  r_os_  r_o_s  r__os  _ros_  _ro_s  _r_os  __ros
       _o___  _o_s_  _o___  ___s_  _____  _____  ___s_  _____  _____  __r__

              R(h->r) K(o) D(r) K(s) D(e)

       hor_se  _horse
       __ros_  r_o_s_
       __r_s_  __o_s_

intention intention inten_tion
execution execution _execution
          _____tion ___e__tion

i     i___  _i__  __i_  ___i
firm  firm  firm  firm  firm
      ____  _i__  ____  ____

firm  firm  firm  firm  firm
i     i___  _i__  __i_  ___i
      ____  _i__  ____  ____

genuflect     genuf___lect  __genuflect
englishlect   _englishlect  englishlect
              _en_____lect  __g____lect

isuflect      ____isuflect  ___isuflect
englishlect   englis_hlect  englishlect
              ____is__lect  _______lect
                 BETTER

isunflect     ____isunflect  __isunflect
englishlect   englis__hlect  englishlect
              ____is___lect  _______lect
                          EVEN

isungflect    ____isungflect  _isungflect
englishlect   englis___hlect  englishlect
              ____is____lect  _______lect
                                BETTER

ishflect        ____is_hflect__  ____ishflect__
englisahlectsy  englisah_lectsy  englisahlectsy
                ____is_h_lect__  ________lect__
                    BETTER


"""

