#!/usr/bin/env python3
# filename: FunctionAnnotation.py

"""
 Usage
 -----
 $ python FunctionAnnotation.py
"""

def sum_two_numbers(a: int, b: int) -> int:
    return a + b


if __name__ == '__main__':
    print('')
    print('A function annotation is an annotation (unenforced note) giving a "type hint" for a function parameter or a return value.')
    print('')
    print('For example, take this bit of code:')
    print('')
    print('def sum_two_numbers(a: int, b: int) -> int:')
    print('    return a + b')
    print('')
    print('It gives a clue of what is expected by the author, but it doesn\'t restrict usage:')
    print('')
    print(f' sum_two_numbers(1,2)     = {sum_two_numbers(1,2)}')
    print(f' sum_two_numbers(1.2,2.3) = {sum_two_numbers(1.2,2.3)}')
    print('')
    print('See for more info:')
    print('  https://docs.python.org/3/glossary.html#term-function-annotation')
    print('')

