#!/usr/bin/env python3
#filename: LongestSubstring_3.py

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
python LongestSubstring_3.py


~~~~~~~~~~~~~~~~~~
      Notes
~~~~~~~~~~~~~~~~~~

"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        uniqueChars = set()
        i = 0
        for char in s:
            if char not in uniqueChars:
                uniqueChars.add(char)
                # char = s[i]
                i += 1
            else:
                break
        # s[i] *was* in uniqueChars (is a repeat)
        # s[:i] stops before s[i], so one each of uniqueChars
        # len(s[:i]) = i
        print(f's     = {s}')
        print(f's[:i] = {s[:i]}')
        print(f'i     = {i}')
        print('')
        return i


if __name__ == '__main__':
    soln = Solution()
    soln.lengthOfLongestSubstring("")
    soln.lengthOfLongestSubstring("a")
    soln.lengthOfLongestSubstring("abcdabracadabra")

