#!/usr/bin/env python3
# filename: LongestSubstring.py
# purpose: Solve leetcode problem 003 "Longest Substring Without
#          Repeating Characters".

"""
LongestSubstring.py
~~~~~~~~~~~~~~~~~~~
Given a string, find the length of the longest substring without
repeating characters.

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
             Note that the answer must be a substring, "pwke" is a
             subsequence and not a substring.

To operate, execute the following in a shell terminal:
python3 LongestSubstring.py Input.txt
"""

import sys
import os


class Solution:

    def lengthOfLongestSubstring(self, s: str) -> int:
        """Return length of the longest substring of a string."""
        c = "" # substring (current)
        p = "" # substring (previous longest)
        for char in s:
            if char not in c:
                c += char
            else:
                # Can't add to current substring; decide whether to save current
                if len(c) > len(p):
                    p = c
                # Start new current substring, keep as much as possible from old
                c = c[c.index(char)+1:] + char
        return max(len(c), len(p))


def main():
    """Apply lengthOfLongestSubstring() to input file, print to output
    file & screen."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        with open(sys.argv[1], 'r') as file_in:
            num_trials = int(file_in.readline().rstrip())
            for _ in range(num_trials):
                string = file_in.readline().rstrip().strip('\"')
                result = soln.lengthOfLongestSubstring(string)
                #output_str = board_str_multiline + str(result) + '\n'
                file_out.write( str(result) + '\n' )
                print(result)
                #file_out.write(output_str + '\n')
                #print(output_str)


if __name__ == '__main__':
    main()


