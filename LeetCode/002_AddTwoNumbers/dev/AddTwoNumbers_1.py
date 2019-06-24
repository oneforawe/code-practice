#!/usr/bin/env python3
#filename: AddTwoNumbers_1.py

"""
This program is a solution to a leetcode.com programming problem.

LeetCode problem title: 2. Add Two Numbers

~~~~~~~~~~~~~~~~~~~
Problem Description
~~~~~~~~~~~~~~~~~~~

You are given two *non-empty* linked lists representing two non-
negative integers. The digits are stored in *reverse order* and each of
their nodes contain a single digit. Add the two numbers and return it
as a linked list.

You may assume the two numbers do not contain any leading zero, except
the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Provided Beginning of Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def addTwoNumbers(self, l1, l2):
       ~triple quote~
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        ~triple quote~

~~~~~~~~~~~~~~~~~~~~~~~~~~
Pseudo Code for a Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~

(probably should end up being a recursive solution)
(although first node is special..)





~~~~~~~~~~~~~~~~~~~
Using This Solution
~~~~~~~~~~~~~~~~~~~


"""

# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, d=None, p=None):
        """
        Initialize a list node.

        :type d: int
        :type p: ListNode ("pointing to the next node")
        """

        self.data = d
        self.next = p


class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        Add two integers, represented as 'backwards' linked-lists.

        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """

        carrier = 0      # initialize carry-over term, which can be 0 or 1
        l3 = ListNode()  # initialize the head of the list sum
        l3.data = l1.data + l2.data
        # the node value must be a single digit:
        if l3.data >= 10:
            carrier = 1
            l3.data = l3.data % 10

        # In case further steps are required:
        l1_prev = l1
        l2_prev = l2
        l3_prev = l3
        l1_curr = ListNode()
        l2_curr = ListNode()
        l3_curr = ListNode()

        # while there is at least one more digit/place from a list to be added..
        while l1_prev.next != None or l2_prev.next != None:
            # create next sum node:
            x1 = 0
            x2 = 0
            if l1_prev.next != None:
                l1_curr = l1_prev.next
                x1 = l1_curr.data
            if l2_prev.next != None:
                l2_curr = l2_prev.next
                x2 = l2_curr.data
            l3_curr.data = x1+x2+carrier
            carrier = 0  # reset carrier
            # the node value must be a single digit:
            if l3_curr.data >= 10:
                carrier = 1
                l3_curr.data = l3.data % 10
                # ERROR !! -- THIS SHOULD BE:
                #l3_curr.data = l3_curr.data % 10
            # link with previous sum node:
            l3_prev.next = l3_curr
            # prepare for next iteration:
            # IS THIS GOING TO WORK ???        NOPE, DIDN'T WORK.. FIX IT !!!
            #
            # maybe try printing things out to see what's going on
            #
            l1_prev = l1_curr
            l2_prev = l2_curr
            l3_prev = l3_curr
            l1_curr = ListNode()
            l2_curr = ListNode()
            l3_curr = ListNode()

        if carrier == 1:
            l3_curr.data = carrier

        return l3





    def stepThroughList(self, l1):
        l1_prev = l1
        l1_curr = ListNode()

        while l1_prev.next != None:
            print("\n l1_prev : " + str(l1_prev)
                           + "\t" + str(l1_prev.data)
                           + "\t" + str(l1_prev.next)
                )
            l1_curr = l1_prev.next
            l1_prev = l1_curr
            l1_curr = ListNode()

        print("\n l1_prev : " + str(l1_prev)
                       + "\t" + str(l1_prev.data)
                       + "\t" + str(l1_prev.next)
            )



    def stepThroughLists(self, l1, l2):
        carrier = 0      # initialize carry-over term, which can be 0 or 1
        l3 = ListNode()  # initialize the head of the list sum
        l3.data = l1.data + l2.data
        # the node value must be a single digit:
        if l3.data >= 10:
            carrier = 1
            l3.data = l3.data % 10

        # In case further steps are required:
        l1_prev = l1
        l2_prev = l2
        l3_prev = l3
        print("\n l3_curr : " + str(l1_prev)
                       + "\t" + str(l1_prev.data)
                       + "\t" + str(l1_prev.next)
            )
        print("\n l3 :      " + str(l1_prev)
                       + "\t" + str(l1_prev.data)
                       + "\t" + str(l1_prev.next)
            )
        print("\n")
        l1_curr = ListNode()
        l2_curr = ListNode()
        l3_curr = ListNode()

        # while there is at least one more digit/place from a list to be added..
        while l1_prev.next != None or l2_prev.next != None:
            # create next sum node:
            x1 = 0
            x2 = 0
            if l1_prev.next != None:
                print("\n l1_prev : " + str(l1_prev)
                               + "\t" + str(l1_prev.data)
                               + "\t" + str(l1_prev.next)
                    )
                l1_curr = l1_prev.next
                x1 = l1_curr.data
            if l2_prev.next != None:
                print("\n l2_prev : " + str(l2_prev)
                               + "\t" + str(l2_prev.data)
                               + "\t" + str(l2_prev.next)
                    )
                l2_curr = l2_prev.next
                x2 = l2_curr.data
            l3_curr.data = x1+x2+carrier
            carrier = 0  # reset carrier
            # the node value must be a single digit:
            if l3_curr.data >= 10:
                carrier = 1
                l3_curr.data = l3.data % 10
            # link with previous sum node:
            l3_prev.next = l3_curr
            print("\n l3_prev : " + str(l3_prev)
                           + "\t" + str(l3_prev.data)
                           + "\t" + str(l3_prev.next)
                )
            print("\n l3      : " + str(l3_prev)
                           + "\t" + str(l3_prev.data)
                           + "\t" + str(l3_prev.next)
                )
            # prepare for next iteration:
            # IS THIS GOING TO WORK ???        NOPE, DIDN'T WORK.. FIX IT !!!
            #
            # maybe try printing things out to see what's going on
            #
            l1_prev = l1_curr
            l2_prev = l2_curr
            l3_prev = l3_curr
            l1_curr = ListNode()
            l2_curr = ListNode()
            l3_curr = ListNode()

        if carrier == 1:
            l3_curr.data = carrier

        return l3


