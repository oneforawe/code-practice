#!/usr/bin/env python3
#filename: AddTwoNumbers_8.py

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

based upon
https://leetcode.com/problems/add-two-numbers/discuss/206428/Nice-(to-me)-Solution-in-Python3


~~~~~~~~~~~~~~~~~~~
Using This Solution
~~~~~~~~~~~~~~~~~~~

Enter this in the shell:
python AddTwoNumbers_test8.py


~~~~~~~~~~~~~~~~~~
      Notes
~~~~~~~~~~~~~~~~~~

"None" is not a ListNode type (although maybe it's a sub-type):

>> from AddTwoNumbers_8 import *
>> print(listo)
   <AddTwoNumbers_8.ListNode object at 0x10a99a2e8>
>> listo.val
>> print(listo.val)
   None
>> print(listo.next)
   None
>> listo = None
>> print(listo.val)
   Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
      AttributeError: 'NoneType' object has no attribute 'val'


At first, I thought this:
        # So "None" is apparently a valid ListNode object,
        # which can be broken down into
        # None.val = None  and  None.next = None.



So, addTwoNumbers can accept lists of this form:
    n1 = None
    n2 = None
but it can't accept lists of this form:
    e1 = ListNode(None)
    e2 = ListNode(None)

See, for example:

>> from AddTwoNumbers_8 import *
>> n1 = None
>> n2 = None
>> e1 = ListNode(None)
>> e2 = ListNode(None)
>> sn = Solution.addTwoNumbers(Solution,n1,n2)
>> print(sn)
   None
>> print(sn.val)
   Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
      AttributeError: 'NoneType' object has no attribute 'val'
>> print(sn.next)
   Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
      AttributeError: 'NoneType' object has no attribute 'next'

>> se = Solution.addTwoNumbers(Solution,e1,e2)
   Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
      File "/Users/zero/Dev/Learn/python/leetcode/002_AddTwoNumbers/AddTwoNumbers_8.py", line 112, in addTwoNumbers
        l3_head = self.addTwoDigitsRecurse(self, l1, l2, None, 0)
      File "/Users/zero/Dev/Learn/python/leetcode/002_AddTwoNumbers/AddTwoNumbers_8.py", line 139, in addTwoDigitsRecurse
        l3_val = l1_val + l2_val + carried_val
      TypeError: unsupported operand type(s) for +: 'NoneType' and 'NoneType'

"""

# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        """
        Initialize a linked-list node.
        """
        self.val  = x     # type int or NoneType
        self.next = None  # type ListNode ("pointing to next node") or NoneType


class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        Add two integers, represented as 'backwards' linked-lists.

        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        l3_head = self.addTwoDigitsRecurse(self, l1, l2, None, 0)
        return l3_head

    def addTwoDigitsRecurse(self, l1, l2, prev_l3, carried_val):
        # Recursion through 2 linked lists representing 2 multi-digit numbers.
        # The first "prev_l3" node is None
        # because there isn't an l3 node before the first l3 node.

        # Need a(nother) l3 node?
        if (l1 is None) and (l2 is None) and (carried_val == 0):
            # No need for a(nother) l3 node or to link back to a prev l3 node.
            # (If this is the first iteration, this is equivalent to returning
            # l3 = l3_head = None, otherwise it is simply taking no action and
            # ending the recursive list construction process.)
            return None
            # Else, there is a need for a(nother) l3 node.

        # We need the value in l3 and the next values for l1, l2, and
        # carried_val (for the next recursive iteration).
        # The default is if there are no more digits in either l1 or l2.
        l1_val,  l2_val  = 0,    0
        next_l1, next_l2 = None, None
        if l1 is not None:
            l1_val  = l1.val
            next_l1 = l1.next
        if l2 is not None:
            l2_val  = l2.val
            next_l2 = l2.next
        l3_val = l1_val + l2_val + carried_val
        if l3_val >= 10:
            next_carried_val = 1
            l3_val = l3_val % 10
        else:
            next_carried_val = 0
        l3 = ListNode(l3_val)

        # Need to link from a previous l3 node?
        if prev_l3 is not None:
            # There is a need to link to a previous node.
            prev_l3.next = l3
            # Else, (if it is None) we are at the first node
            # and don't need to link to a previous node.

        # Progress to the next nodes' digits.
        self.addTwoDigitsRecurse(self, next_l1, next_l2, l3, next_carried_val)

        # Only the outer-most recursive iteration's return value is recorded
        # (in addTwoNumbers).
        return l3

