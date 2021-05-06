#!/usr/bin/env python3
# filename: SimplestFunction_interactive.py

"""
 Usage
 -----
 Check Python version (to make sure it's version 3):
 $ python --version
   Python 3.6.8 :: Anaconda custom (64-bit)
 Enter Python interactive mode from shell command-line interface:
 $ python
 >>>
 Import everything (ie, the function f) from this file:
 >>> from SimplestFunction_interactive import *
 Now test anything you like from the interactive command line:
 >>> x = f()
 >>> x
 >>> print(x)
     None
 >>> type(f())
     <class 'NoneType'>
"""

def f():
    # Simplest function, does nothing, returns nothing (well, returns None)
    pass # the "pass" statement; a "null operation"; does nothing
    # Note: "pass" doesn't even return a type; type(pass) returns a syntax error
    # The function itself returns None by default

