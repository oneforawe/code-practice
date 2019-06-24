#!/usr/bin/env python3
#filename: AddTwoNumbers_7.py

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

Enter this in the shell:
python AddTwoNumbers_test7.py

"""

# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        """
        Initialize a linked-list node.
        """
        self.val  = x     # type int
        self.next = None  # type ListNode ("pointing to the next node")



class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        Add two integers, represented as 'backwards' linked-lists.

        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """

        carrier = 0       # initialize carry-over term, which can be 0 or 1
        l3 = ListNode(0)  # initialize the head of the list sum
        l3.val = l1.val + l2.val
        # the node value must be a single digit:
        if l3.val >= 10:
            carrier = 1
            l3.val = l3.val % 10

        # In case further steps are required:
        l1_curr = l1
        l2_curr = l2
        l3_curr = l3
        l1_next = ListNode(0)
        l2_next = ListNode(0)
        l3_next = ListNode(0)

        # while there is at least one more digit/place from a list to be added..
        while l1_curr.next != None or l2_curr.next != None:
            # link to next sum node:
            l3_curr.next = l3_next
            # known:   l3_curr.val
            # unknown: l3_next.val
            # find l3_next.val:
            x1 = 0
            x2 = 0
            if l1_curr.next != None:
                l1_next = l1_curr.next
                x1 = l1_next.val
            if l2_curr.next != None:
                l2_next = l2_curr.next
                x2 = l2_next.val
            l3_next.val = x1+x2+carrier
            carrier = 0  # reset carrier
            # the node value must be a single digit:
            if l3_next.val >= 10:
                carrier = 1
                l3_next.val = l3_next.val % 10
            # prepare for next iteration:
            l1_curr = l1_next
            l2_curr = l2_next
            l3_curr = l3_next
            l1_next = ListNode(0)
            l2_next = ListNode(0)
            l3_next = ListNode(0)

        # if, after summing up all the list digits, there's still a carry-over..
        if carrier == 1:
            # link to next sum node:
            l3_curr.next = l3_next
            # known:   l3_curr.val
            # unknown: l3_next.val
            l3_next.val = carrier

        return l3

