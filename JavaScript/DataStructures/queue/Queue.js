/*
  Author: Andrew Forrester
  Web:    https://www.andrew-forrester.com/

  Basic Usage:
    Enter a node REPL by executing `node` in the shell. Then execute
    `.load Queue.js` in the REPL to run the file.  (It also prints out the file
    in a really messy manner, unfortunately.)  Then the data structure can be
    used by executing commands such as:
    `let q = new Queue([1,2,3])`
    `q`
    `q.data`
    `q.enqueue(4)`
    `q.dequeue()`
    `q.peek()`
    `q.length()`
    etc

  NOTE: Data structures do not seem to have standardized universal definitions
        in information technology / computer science, and they often vary
        across different programming languages and implementations. What
        follows is my own synthesis of what I've encountered so far in my study

  Data Structure:
    queue
      - a "line", FIFO (first in, first out)
      - a linearly-ordered collection of elements, where the elements are
        ordered by time of entry into the queue, such that the earliest added
        are at the "front" of the queue and the latest added are at the
        "back" of the queue, so to add ("enqueue") an element is to put the
        element at the "back" of the queue, and to remove ("dequeue") an
        element is to extract it from the "front" of the queue, with its
        previously-adjacent element then at the "front".
      - With zero elements, there is no front or back. With one element, that
        element is at the front and the back of the queue simultaneously.
        With two or more elements, the front and back are at different
        locations in the queue. These are abstract "locations" in the data
        structure and do not necessarily refer to spatial locations or
        locations in computer memory. For instance, it is unspecified and
        irrelevant (according to these abstract data structure specifications)
        whether any of these "locations" stay "in place" or "move", or even
        whether the queue elements really form a "line" at all. In a concrete
        implementation, the elements could be scattered over space in a
        chaotic mess, so long as there is some means of keeping track of all
        elements and their order in the queue and one retains the ability to
        add and remove elements while maintaining the ordering. In another
        scenario, the "front" might stay in place so that when an element is
        dequeued the following elements move "forward" to take their new
        places in the queue. Or the "front" might move backward each time an
        element is dequeued, so all elements stay in place and the "front"
        moves. Or the "back" could stay in place, while the "front" moves. Or
        some other scheme could be used. All that matters is that the
        information about order is retained and the actions or methods of the
        queue structure can be applied.

  Methods (2 main, ~2 helper):
    enqueue: add an element to the "back"
    dequeue: remove an element from the "front"
    length: return the number of elements in the queue (without modifying the queue)
    peek: return the value of the first element (without modifying the queue)

  Example:
    Customers waiting in line for a service, with a policy of "first come,
    first served".  This can be modeled with a "queue" data structure, where
    each customer is modeled as an element in the queue, they enqueue to get
    into the line, and they dequeue to then receive their awaited service.

  THIS IMPLEMENTATION:
    In this implementation, a native JavaScript Array structure is used to
    instantiate the kind of queue data structure that's described above.  (The
    JavaScript Array is itself a special kind of JavaScript Object structure.)
*/


class Queue {
  constructor(array) {
    this.data = (Array.isArray(array)) ? array : []
  }
  peek() {
    return this.data[0]
  }
  length() {
    return this.data.length
  }
  enqueue(element) {
    this.data[this.length()] = element
  }
  dequeue() {
    let first = this.peek()
    this.data.forEach((element, index, array) => {
      if (index < array.length - 1) { array[index] = array[index + 1] }
    })
    this.data.length = this.data.length - 1
    return first
  }
}

// console.log("Data Structure Demo: queue")
// console.log('\n  See the preamble comments in the Queue.js file ' +
//   'for an explanation of the "queue" data structure.')
// console.log(`\n  Let's demonstrate usage of this structure:\n`)

// //console.log(Queue.toString())
// let space = '    '
// console.log(space + Queue.toString().replaceAll(/\n/g, '\n' + space))
// console.log('\n')
