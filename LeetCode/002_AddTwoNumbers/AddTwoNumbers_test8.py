#!/usr/bin/env python3
#filename: AddTwoNumbers_test8.py

"""
~~~~~~~~~~~~~~~~~~~
Testing My Solution
~~~~~~~~~~~~~~~~~~~

"""

from AddTwoNumbers_8 import *
# Didn't work:
# import AddTwoNumbers_1


########################################
#             list one
########################################

# list one nodes:
n1_a = ListNode(0)
n1_b = ListNode(9)
n1_c = ListNode(9)
n1_d = ListNode(9)
n1_e = ListNode(9)
# links:
n1_d.next = n1_e
n1_c.next = n1_d
n1_b.next = n1_c
n1_a.next = n1_b
# list one:
list1 = n1_a

print("\n")
print(  "list1 : "
      + " [ "  + str(list1.val)
      + " -> " + str(list1.next.val)
      + " -> " + str(list1.next.next.val)
      + " -> " + str(list1.next.next.next.val)
      + " -> " + str(list1.next.next.next.next.val)
      + " ]"
    )
print(  "\n"
      + "list1 node a :  " + str(list1) + "\n"
      + "list1 node b :  " + str(list1.next) + "\n"
      + "list1 node c :  " + str(list1.next.next) + "\n"
      + "list1 node d :  " + str(list1.next.next.next) + "\n"
      + "list1 node e :  " + str(list1.next.next.next.next) + "\n"
      + "list1 node f :  " + str(list1.next.next.next.next.next)
    )


########################################
#             list two
########################################

# list two nodes:
n2_a = ListNode(2)
n2_b = ListNode(8)
n2_c = ListNode(7)
# links:
n2_b.next = n2_c
n2_a.next = n2_b
# list two:
list2 = n2_a

print("\n")
print(  "list2 : "
      + " [ "  + str(list2.val)
      + " -> " + str(list2.next.val)
      + " -> " + str(list2.next.next.val)
      + " ]"
    )
print(  "\n"
      + "list2 node a : " + str(list2) + "\n"
      + "list2 node b : " + str(list2.next) + "\n"
      + "list2 node c : " + str(list2.next.next) + "\n"
      + "list2 node d : " + str(list2.next.next.next)
    )


########################################
#             list sum
########################################


print(  "\n\n"
      + "AddTwoNumbers Sum\n"
      + "======================================================\n"
      + "list3 = Solution.addTwoNumbers(Solution, list1, list2)\n"
      + "------------------------------------------------------\n"
    )
list3 = Solution.addTwoNumbers(Solution, list1, list2)
print(  "list3 : "
      + " [ "  + str(list3.val)
      + " -> " + str(list3.next.val)
      + " -> " + str(list3.next.next.val)
      + " -> " + str(list3.next.next.next.val)
      + " -> " + str(list3.next.next.next.next.val)
      + " -> " + str(list3.next.next.next.next.next.val)
      + " ]"
    )
print(  "\n"
      + "list3 node a : " + str(list3) + "\n"
      + "list3 node b : " + str(list3.next) + "\n"
      + "list3 node c : " + str(list3.next.next) + "\n"
      + "list3 node d : " + str(list3.next.next.next) + "\n"
      + "list3 node e : " + str(list3.next.next.next.next) + "\n"
      + "list3 node f : " + str(list3.next.next.next.next.next) + "\n"
      + "list3 node g : " + str(list3.next.next.next.next.next.next)
    )
print("\n")


print(  "More plainly:\n\n"
      + "   "
      + str(list1.next.next.next.next.val)
      + str(list1.next.next.next.val)
      + str(list1.next.next.val)
      + str(list1.next.val)
      + str(list1.val)
      + "  (list1)\n"
      + " +   "
      + str(list2.next.next.val)
      + str(list2.next.val)
      + str(list2.val)
      + "  (list2)\n"
      + "------------------\n"
      + "  "
      + str(list3.next.next.next.next.next.val)
      + str(list3.next.next.next.next.val)
      + str(list3.next.next.next.val)
      + str(list3.next.next.val)
      + str(list3.next.val)
      + str(list3.val)
      + "  (list3)\n"
    )


########################################
#         inputs not altered
########################################

print("\n\n"
      + "The inputs are not altered by the solution:"
    )

print("\n")
print(  "list1 : "
      + " [ "  + str(list1.val)
      + " -> " + str(list1.next.val)
      + " -> " + str(list1.next.next.val)
      + " -> " + str(list1.next.next.next.val)
      + " -> " + str(list1.next.next.next.next.val)
      + " ]"
    )
print(  "\n"
      + "list1 node a :  " + str(list1) + "\n"
      + "list1 node b :  " + str(list1.next) + "\n"
      + "list1 node c :  " + str(list1.next.next) + "\n"
      + "list1 node d :  " + str(list1.next.next.next) + "\n"
      + "list1 node e :  " + str(list1.next.next.next.next) + "\n"
      + "list1 node f :  " + str(list1.next.next.next.next.next)
    )

print("\n")
print(  "list2 : "
      + " [ "  + str(list2.val)
      + " -> " + str(list2.next.val)
      + " -> " + str(list2.next.next.val)
      + " ]"
    )
print(  "\n"
      + "list2 node a : " + str(list2) + "\n"
      + "list2 node b : " + str(list2.next) + "\n"
      + "list2 node c : " + str(list2.next.next) + "\n"
      + "list2 node d : " + str(list2.next.next.next)
    )
print("\n\n")


