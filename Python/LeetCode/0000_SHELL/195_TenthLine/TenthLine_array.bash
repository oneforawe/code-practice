#!/usr/bin/env bash
# filename: TenthLine_2.bash
# purpose: Solve leetcode problem 195 "Tenth Line".


: '
TenthLine.bash
~~~~~~~~~~~~~~
Given a text file file.txt, print just the 10th line of the file.

Example:
Assume that `file.txt` has the following content:

```
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
```

Your script should output the tenth line, which is:
```
Line 10
```

Note:
1. If the file contains less than 10 lines, what should you output?
2. There is at least three different solutions. Try to explore all possibilities.


To operate, execute the following in a shell terminal:
bash TenthLine.bash file.txt
'


# Read from the file file.txt and output the tenth line to stdout.

function echo_tenth_line {
  input_file="$1"
  readarray arr < $input_file
  echo ${arr[10-1]}
}


echo_tenth_line $1

