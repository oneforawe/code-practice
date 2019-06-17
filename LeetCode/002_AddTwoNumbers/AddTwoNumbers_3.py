#!/usr/bin/env python3
#filename: AddTwoNumbers_3.py

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
        l1_curr = l1
        l2_curr = l2
        l3_curr = l3
        l1_next = ListNode()
        l2_next = ListNode()
        l3_next = ListNode()
        l1_temp = ListNode()
        l2_temp = ListNode()
        l3_temp = ListNode()

        # while there is at least one more digit/place from a list to be added..
        while l1_curr.next != None or l2_curr.next != None:
            # create next sum node:
            x1 = 0
            x2 = 0
            if l1_curr.next != None:
                l1_next = l1_curr.next
                x1 = l1_next.data
            if l2_curr.next != None:
                l2_next = l2_curr.next
                x2 = l2_next.data
            l3_next.data = x1+x2+carrier
            carrier = 0  # reset carrier
            # the node value must be a single digit:
            if l3_next.data >= 10:
                carrier = 1
                l3_next.data = l3.data % 10
            # link with next sum node:
            l3_curr.next = l3_next
            # prepare for next iteration:
            l1_temp = l1_curr
            l2_temp = l2_curr
            l3_temp = l3_curr
            l1_curr = ListNode()
            l2_curr = ListNode()
            l3_curr = ListNode()
            l1_curr = l1_next
            l2_curr = l2_next
            l3_curr = l3_next
            l1_next = ListNode()
            l2_next = ListNode()
            l3_next = ListNode()

        if carrier == 1:
            l3_next.data = carrier
            l3_curr.next = l3_next

        return l3

