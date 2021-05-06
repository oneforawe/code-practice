#!/usr/bin/env python3
#filename: LongestSubstring_5.py

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

for each unique letter,
collect all substrings-without-repititions starting with that letter
  (IE, collect the unique_chars and the sub-string length)

  dictionary {unique_char : substrings_data}

  {
    char1 : [ {unique_chars_in_substring}, [length1, length2, etc] ],
    ...
    charN : [ {unique_chars_in_substring}, [length1, length2, etc] ],
  }

For abcbamboy
  {
    a : [ {current/last unique_chars_in_substring}, [3, 5] ],
    b : [ {current/last unique_chars_in_substring}, [2, 3, 3] ],
    c : [ {current/last unique_chars_in_substring}, [4] ],
    m : [ {current/last unique_chars_in_substring}, [4] ],
    o : [ {current/last unique_chars_in_substring}, [2] ],
    y : [ {current/last unique_chars_in_substring}, [1] ],
  }

Then find the longest value in the lists of lengths.

~~~~~~~~~~~~~~~~~~~
Using This Solution
~~~~~~~~~~~~~~~~~~~

Enter this in the shell:
python LongestSubstring_5.py


~~~~~~~~~~~~~~~~~~
      Notes
~~~~~~~~~~~~~~~~~~

"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        data = dict() # substrings_data_by_unique_char
        for char in s:
            if char not in data.keys:
                # add new key
                data[char] = [ {char} , [[1]] ]
            else:
                # 



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
