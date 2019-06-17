#!/usr/bin/env python3
#filename: LongestSubstring.py

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


if __name__ == '__main__':

    import sys
    import os

    soln = Solution()

    f_in = open(sys.argv[1],'r')

    os.environ['OUTPUT_PATH'] = "./Output.txt"
    f_out = open(os.environ['OUTPUT_PATH'],'w')

    num_strings = int(f_in.readline())
    for _ in range(num_strings):
        string = f_in.readline().strip('\n').strip('\"')
        result = soln.lengthOfLongestSubstring(string)
        f_out.write( str(result) + '\n' )

    f_in.close()
    f_out.close()

