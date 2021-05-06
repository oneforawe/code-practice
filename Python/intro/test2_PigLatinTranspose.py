#!/usr/bin/env python3
#filename: test2_PigLatinTranspose.py

def pig_latin(line):
    output = ""
    word_list = line.split()
    length = len(word_list)

    for i in range(length):
        word = word_list[i]
        word_len = len(word)
        try:
            num = int(word)
        except ValueError:
            # not number, letters
            first_let = word[0]
            after_lets = word[1:word_len]
            pig_word = after_lets + first_let + "ay"
        else:
            # a number
            pig_word = word
        output += pig_word + " "

    return output

# Accept input from standard input
line = input()
print(pig_latin(line))
