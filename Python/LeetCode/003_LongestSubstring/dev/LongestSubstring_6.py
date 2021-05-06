#!/usr/bin/env python3
#filename: LongestSubstring_6.py

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
python LongestSubstring_6.py


~~~~~~~~~~~~~~~~~~
      Notes
~~~~~~~~~~~~~~~~~~

"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        a = "" # substring attempt 1
        b = "" # substring attempt 2
        print(f's = {s}')
        for i in range(len(s)):
            if s[i] not in a:
                a += s[i]
                print(f'a = {a.ljust(10)} b = {b}')
            else:
                print(f'a = {a.ljust(10)} b = {b}')
                if len(b) < len(a):
                    b = a
                print(f'a = {a.ljust(10)} b = {b}')
                print(f'a.index(s[i])+1             = {a.index(s[i])+1}')
                print(f'a[a.index(s[i])+1::]        = {a[a.index(s[i])+1::]}')
                print(f'a[a.index(s[i])+1::] + s[i] = {a[a.index(s[i])+1::] + s[i]}')
                a = a[a.index(s[i])+1::] + s[i]

        print(f'a = {a.ljust(10)} b = {b}')
        print('')
        return max(len(b), len(a))



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
    soln.lengthOfLongestSubstring("abcbamboy")
