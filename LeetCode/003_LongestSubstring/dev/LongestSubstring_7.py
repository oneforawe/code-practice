#!/usr/bin/env python3
#filename: LongestSubstring_7.py

"""
This program is a solution to a leetcode.com programming problem.

LeetCode problem title: 3. Longest Substring Without Repeating Characters

~~~~~~~~~~~~~~~~~~~
Problem Description
~~~~~~~~~~~~~~~~~~~

Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Provided Beginning of Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:


~~~~~~~~~~~~~~~~~~~~~~~~~~
Pseudo Code for a Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~


~~~~~~~~~~~~~~~~~~~
Using This Solution
~~~~~~~~~~~~~~~~~~~

Enter this in the shell:
python LongestSubstring_7.py


~~~~~~~~~~~~~~~~~~
      Notes
~~~~~~~~~~~~~~~~~~

"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        c = "" # substring (current)
        p = "" # substring (previous longest)
        for i in range(len(s)):
            if s[i] not in c:
                c += s[i]
            else:
                # Can't add to current substring; decide whether to save current
                if len(c) > len(p):
                    p = c
                # Start new current substring, keep as much as possible from old
                c = c[c.index(s[i])+1:] + s[i]
        return max(len(c), len(p))


if __name__ == '__main__':

    import os
    import sys

    soln = Solution()

    f_in = open(sys.argv[1],'r')

    os.environ['OUTPUT_PATH'] = "./Output.txt"
    f_out = open(os.environ['OUTPUT_PATH'],'w')

    num_strings = int(f_in.readline())
    for _ in range(num_strings):
        string = f_in.readline()
        result = soln.lengthOfLongestSubstring(string)
        f_out.write( str(result) + '\n' )

    f_in.close()
    f_out.close()

