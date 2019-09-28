#!/usr/bin/env bash
# filename: TenthLine_scratch.bash
# purpose: Solve leetcode problem 195 "Tenth Line".


# Read from the file file.txt and output the tenth line to stdout.

function echo-tenth-line {
    input_file="$1"
    # set line counter to zero:
    n=0
    #while  IFS= read -r line  ;
    #< $input_file | while  IFS= read -r line  ;
    #<(echo $input_file) |
    #< $input_file |
    cat $input_file |
    {
        while  IFS= read -r line  ;
        do
            # increment line counter
            n=$((n+1))
            echo $n
            # take action on $line #10
            if [[ $n -eq 4 ]] ; then
                echo "$line"
            fi
        done
    }
    #done < $input_file
}


echo-tenth-line $1

