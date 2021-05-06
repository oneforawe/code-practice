#!/usr/bin/env python3
#filename: LongestSubstring_1.py

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
python LongestSubstring_1.py


~~~~~~~~~~~~~~~~~~
      Notes
~~~~~~~~~~~~~~~~~~

"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        uniqueChars = set()
        i = 0
        while s[i] not in uniqueChars:
            uniqueChars.add(s[i])
            i += 1
        # s[i] *is* in uniqueChars
        # s[:i] stops before s[i]
        # len(s[:i]) = i
        print(len(s[:i]))
        print(i)
        return i


if __name__ == '__main__':
    soln = Solution()
    soln.lengthOfLongestSubstring("abcdabracadabra")

