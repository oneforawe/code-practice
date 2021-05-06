#!/usr/bin/env python3
# filename: Interactive_Importation.py
# purpose: Illustrate how to import a function from a file in interactive mode.


"""
To import the function below, enter the interactive python interpreter/shell and
import the function from the file:


Sketch:

$ python
>>> from filename import function
>>> function(arguments)


Example:

$ python
 Python 3.7.3 (default, Mar 27 2019, 16:54:48)
 [Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
 Type "help", "copyright", "credits" or "license" for more information.
>>> from Interactive_Importation import add_these
>>> add_these(3, 5)
8

"""


def add_these(n, m):
    return n + m

