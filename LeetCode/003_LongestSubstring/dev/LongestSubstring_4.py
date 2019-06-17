#!/usr/bin/env python3
#filename: LongestSubstring_4.py

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

for each substring with no repeats
keep track of length of substring

~~~~~~~~~~~~~~~~~~~
Using This Solution
~~~~~~~~~~~~~~~~~~~

Enter this in the shell:
python LongestSubstring_4.py


~~~~~~~~~~~~~~~~~~
      Notes
~~~~~~~~~~~~~~~~~~

"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        subStrLengths = []
        uniqueChars, i = self.init()
        for char in s:
            if char in uniqueChars:
                subStrLengths.append(i)
                uniqueChars, i = self.init()
            uniqueChars.add(char) # char = s[i]
            i += 1
        subStrLengths.append(i)
        # s[i] *was* in uniqueChars (is a repeat)
        # s[:i] stops before s[i], so one each of uniqueChars
        # len(s[:i]) = i
        print(f's = {s}')
        print(f'subStrLengths = {subStrLengths}')
        if subStrLengths:
            print(f'return max(subStrLengths) = {max(subStrLengths)}')
            print('')
            return max(subStrLengths)
        else:
            print(f'return 0')
            print('')
            return 0

    def init(self):
        return set(), 0

if __name__ == '__main__':
    soln = Solution()
    soln.lengthOfLongestSubstring("")
    soln.lengthOfLongestSubstring("a")
    soln.lengthOfLongestSubstring("abcdabracadabra")
    soln.lengthOfLongestSubstring("abcabcbb")
    soln.lengthOfLongestSubstring("bbbbb")
    soln.lengthOfLongestSubstring("pwwkew")
    soln.lengthOfLongestSubstring("abcdamn")
    soln.lengthOfLongestSubstring("abcdambq")
