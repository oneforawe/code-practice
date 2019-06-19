#!/usr/bin/env python3
# filename: AvailableCapturesForRook.py
# purpose: Solve leetcode problem 999 "Available Captures for Rook".


"""
AvailableCapturesForRook.py
~~~~~~~~~~~~~~~~~~~~~~~~~~~
On an 8 x 8 chessboard, there is one white rook.  There also may be
empty squares, white bishops, and black pawns.  These are given as
characters 'R', '.', 'B', and 'p' respectively.  Uppercase characters
represent white pieces, and lowercase characters represent black pieces.

The rook moves as in the rules of Chess: it chooses one of four cardinal
directions (north, east, west, and south), then moves in that direction
until it chooses to stop, reaches the edge of the board, or captures an
opposite colored pawn by moving to the same square it occupies.  Also,
rooks cannot move into the same square as other friendly bishops.

Return the number of pawns the rook can capture in one move.

To operate, execute the following in a shell terminal:
python3 AvailableCapturesForRook.py Input.txt
"""

import os
import sys
import ast
from typing import List


class Solution:

    def __init__(self):
        self.board = None
        self.Ri = None
        self.Rj = None
        self.num = 0   # number of possible pawn captures by rook

    def numRookCaptures(self, board: List[List[str]]) -> int:
        """Find num, the number of possible pawn captures by the rook."""
        self.board = board
        # Re-initialize
        self.num = 0
        # Find the rook
        found = False
        for i, row in enumerate(board):
            for j, square in enumerate(row):
                if square == 'R':
                    Ri = i
                    Rj = j
                    self.Ri = Ri
                    self.Rj = Rj
                    found = True
                    break
            if found == True:
                break
        # Check rook's column and row for possible pawn captures
        # upward
        squares = Ri           # number of squares above rook
        self.search_for_pawn_to_capture(squares, vert_incr = 1, horiz_incr = 0)
        # downward
        squares = 8 - (Ri + 1) # number of squares below rook
        self.search_for_pawn_to_capture(squares, vert_incr = -1, horiz_incr = 0)
        # leftward
        squares = Rj           # number of squares left of rook
        self.search_for_pawn_to_capture(squares, vert_incr = 0, horiz_incr = -1)
        # rightward
        squares = 8 - (Rj + 1) # number of squares right of rook
        self.search_for_pawn_to_capture(squares, vert_incr = 0, horiz_incr = 1)

        return self.num

    def search_for_pawn_to_capture(self, squares, vert_incr, horiz_incr):
        for k in range(1, squares + 1):
            check = self.board[self.Ri - vert_incr * k][self.Rj + horiz_incr * k]
            if check != '.':
                if check == 'p':
                    self.num += 1
                break


def main():
    """Apply numRookCaptures() to input file, print to output file & screen."""
    soln = Solution()
    with open('Output.txt', 'w') as file_out:
        file_out.write('\n') # blank line to start
        print('')
        with open(sys.argv[1], 'r') as file_in:
            num_trials = int(file_in.readline().rstrip())
            for _ in range(num_trials):
                file_in.readline() # blank line between inputs
                board_str_multiline = ''
                for _ in range(8):
                    board_str_multiline += file_in.readline()
                board_str = board_str_multiline.replace('\n','').replace(' ','')
                board = ast.literal_eval(board_str)
                result = soln.numRookCaptures(board)
                output_str = board_str_multiline + str(result) + '\n'
                file_out.write(output_str + '\n')
                print(output_str)


if __name__ == '__main__':
    main()


"""
Notes

Find 'R'. Many possible strategies: brute force, probabilistic, inferential.
Then look along column and row containing 'R', moving from 'R' outwards to find
first piece / figurine or the border of the board.
If a pawn is found first, add to the number count.
"""

