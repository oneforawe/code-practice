#!/usr/bin/env python3
#filename: SimplestFunction_script.py

def a():
    # Simplest function, does nothing, returns nothing (well, returns None)
    pass # the "pass" statement; a "null operation"; does nothing
    # Note: "pass" doesn't even return a type; type(pass) returns a syntax error
    # The function itself returns None by default

if __name__ == '__main__':
    print(f'a         = {a}')
    print(f'a()       = {a()}')
    print(f'type(a)   = {type(a)}')
    print(f'type(a()) = {type(a())}')
