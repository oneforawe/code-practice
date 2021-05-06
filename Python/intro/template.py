#!/usr/bin/env python3
#filename: template.py

def balanced_parens(line):
    output = ""
    count = 0
    count_went_neg = 0
    paren_str = ""

    for char in line:
        if char=="(":
            paren_str += char
            count += 1
        elif char==")":
            paren_str += char
            count -= 1
            if count<0:
                count_went_neg = 1
        else:
            pass

    if count_went_neg==1:
        output += "N "
    else:
        if count!=0:
            output += "N "
        else:
            output += "Y "

    output += paren_str

    return output


# Accept input from standard input
line = input()
print(balanced_parens(line))
