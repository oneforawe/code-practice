#!/usr/bin/env python3
# filename: ResultVsReturn_DualOutcomes.py

"""
 Usage
 -----
 python ResultVsReturn_DualOutcomes.py

"""

def f():
    print('')
    print('The print function has two outcomes:')
    print(' 1) it results in the printing of a string')
    print('    AND')
    print(' 2) it returns None.')
    print('')
    print('Usually, we don\'t care about and don\'t notice ' + \
          'the fact that it returns None, but ' \
          'when executing code such as the following:')
    print('print(f\' print(2*2) = \{print(2*2)\}\')')
    print('')
    print('we can see both outcomes:')
    print(f' print(2*2) = {print(2*2)}')
    print('')


if __name__ == '__main__':
    f()
