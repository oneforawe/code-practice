# Definition for singly-linked list.
#class ListNode:
#    def __init__(self, x):
#        """
#        Initialize a linked-list node.
#        """
#        self.val  = x     # type int (and *not* NoneType)
#        self.next = None  # type ListNode ("pointing to next node") or NoneType


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

    def addTwoDigitsRecurse(l1, l2, prev_l3, carried_val):
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
        self.addTwoDigitsRecurse(next_l1, next_l2, l3, next_carried_val)

        # Only the outer-most recursive iteration's return value is recorded
        # (in addTwoNumbers).
        return l3

