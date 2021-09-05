/*
  Author: Andrew Forrester
  E-mail: andrew@andrew-forrester.com

  Basic Usage: Enter a Node.js REPL by executing `node` in the shell. Then
    execute `.load Array1.js` in the REPL to run the file. (It also prints out
    the file in a really messy manner, unfortunately.) Then the data structure
    can be used by executing commands such as:
    `let arr1 = new SimpleManualArray(3)`
    `let arr2 = new SimpleManualArray()`
    `arr1.set(1, '2nd')`
    etc

  NOTE: Data structures do not seem to have standardized universal definitions
        in information technology / computer science, and they often vary to
        some degree across different programming languages and implementations.
        What follows is my own synthesis of what I've encountered so far in my
        study of data structures and data types.

  Data Structure:
    Motivation
      - I believe we can build the notion of an array data structure from a
        desire for quick data retrieval...

      - Suppose you have a lot of data in the form of a list of elements, with
        each element itself being a chunk of data.  One way to organize this
        data that makes it particularly easy to quickly retrieve each element
        is to put that data in a contiguous section of computer memory-space,
        where each element is alloted its own portion of memory-space that is
        the same size for all portions.  In this way, the memory address for
        each element is a simple function of 1) the first element's address,
        2) the place-position or index number of the element in the list, and
        3) the (constant/uniform) memory-size alloted for each element value.
        Such a function might look as follows (although it could be more
        complex):
          (memory address for index i)
            = (memory address for index 0) + i * (memory-size for each element)

      - For the data to conform to this simple constant/uniform memory
        portioning, it might be best if each element is of the same data type,
        so that each element is likely or guaranteed to take up the same space
        automatically without adjustment before entry into this structure.

      - Another simplifying condition is to require that the memory-space that
        is allocated for the whole data structure not change size throughout
        its usage.  If one expects that some of the data may change, and the
        size of the list will shrink and/or grow, one can estimate ahead-of-
        time the largest length that the list is likely to attain, and assign
        a size for the data structure that can handle that largest length
        (probably with some safety-buffer).  Once that size is set, it could be
        bad if the structure needs to grow beyond that size to accomodate the
        list, because there may be memory-usage surrounding the data structure
        that prevents growing the structure beyond its assigned size without
        over-writing other valuable data.  One way around this problem is to be
        flexible and enable the capacity, during usage, to find a new location
        in memory for the data structure that can accomodate a larger
        structure, and move the whole structure to that new location with a
        larger assigned size.  The simplest scenario, however, is to stick with
        a set size for the data structure (and not automatically handle size
        changes).

      - In information technology / computer science, these notions described
        above seem to be the foundational notions for what is called the array
        data structure.

    array
      - a data structure that uses a contiguous section of memory to host a
        list of data, where the list is a linearly-ordered collection of
        elements (ie, "values"), the elements are independent in the general
        case, they are labeled/indexed by consecutive (non-negative integer)
        numbers (for us, starting at zero) for retrieval of each value by index
        (like finding a house by its address), and the number of elements in
        the array is called the length or size of the array.  An empty array,
        with no elements, has size/length zero.  An array with length L > 0
        will have indices running from zero to L-1; so for L=5: the index
        values are 0, 1, 2, 3, 4.

      - I'll call the zero-index position the "start" position, although it
        could be called the head, front, top, bottom, etc.  I'll call the
        maximum-index position the "end" position.

      - The foundational notion of an array data structure seems to be a
        "static" or constant-size array, as described above in the Motivation.

      - Arrays can also be "dynamic", where the size of the array can be
        changed as it is in use (between being declared and deleted or garbage-
        collected).  I call this dynamism feature an "extension" to the
        foundational array concept, so the functions or "methods" that
        implement this feature are called "extenders".

      - In this implementation, I won't manually enforce data type uniformity
        or manually handle the size of each element's memory-size portion.
        That will be handled behind-the-scenes by the JavaScript Object
        structure, which I use to implement the array data structure.

  Methods (2 main, 2 helper, 2 extender, ~2 extender-helper):
    set(i, v): Assign a value v at index i; (length of array not modified).
               Return undefined (or throw an error if index i is invalid).
    get(i):    Get the value at index i;    (length of array not modified).
               Return that value (and undefined for non-existent elements).

    length:  Return the number of elements in the array (without modification).
    search(v):  Search for the first element with value v; if there is such an
                element, return its index; otherwise return -1. Aka indexOf(v).
                (Another version of search could return all indices of matching
                elements. Aka indicesOf(v).)

    lengthen(): Increase the number of elements in the array by one.
                Return the new length of the array.
                In another formulation, this could take an input for how many
                elements to add, or it could be size dependent (say, doubling
                the length of the array when increasing beyond its current
                limit, which would be a power of two).
    shorten():  Decrease the number of elements in the array, analogously to
                lengthen().  Return the new length of the array.

    insert(i, v): Add a new element (by lengthening the array by one and
                  shifting other elements if necessary to make room in the
                  appropriate location) with value v at index i.
                  Return the new length of the array (or throw an error if
                  index i is invalid).
    delete(i):    Remove the element at index i (by shifting elements if
                  necessary and shortening the array by one).
                  Return the new length of the array (or throw an error if
                  index i is invalid).

  Derivative methods (6):
    insert, delete, push, pop, shift, unshift.
    pop & shift    are special cases of delete.
    push & unshift are special cases of insert.
    I also define a subroutine called shiftValues, which is used in
    insert, delete, shift, and unshift.

  Bonus methods:
    Beyond the scope of the basic data structure, one can create many
    additional useful methods (custom or built-in for a language), such as:
      reverse (reverse the order of the elements),
      shuffle (randomly mix the order of the elements),
      sort    (re-order the elements according to some ordering relation),
      find    (test to find if some element obeys a condition, return element),
      some    (test to find if some element obeys a condition, return boolean),
      slice   (return a sub-array from within the array),
      splice  (a delete-insert-combo method, enable inserting sub-arrays, etc),
      filter  (filter out certain elements according to some condition),
      map     (apply a transformation, element-wise, to create a new array),
      reduce  (apply a transformation, iteratively across all elements),
      concat  (attach two arrays end-to-end to create a new array),
      etc

  Error-handling:
    I created some functions to handle UserExceptions: bad inputs from users.

  Example:
    A prioritized "to-do" list can be implemented as an array, with, say, the
    highest priority to-do item placed at index zero, and lower priority items
    placed with ascending indices.

  THIS IMPLEMENTATION:
    In this implementation, a native JavaScript Object structure is used to
    instantiate the kind of array data structure that's described above.
    Another property, this.end, which is the last index in the array (equal to
    this.length - 1) is defined for conceptual simplicity.  This code is not
    optimized for speed; it is written for conceptual clarity.
*/


function UserException(message) {
  this.message = message;
  this.name = 'InvalidIndex';
}


class SimpleArray {

  // start with a defined size of array, although with empty/undefined elements
  constructor(lengthInitial = 0) {
    this.data = {};
    for (let i = 0; i < lengthInitial; i++) {
      this.data[i] = undefined;
    };
    this.length = lengthInitial;
    this.end = lengthInitial - 1;
  }

  // Only set values for already-existing already-defined element spaces.
  set = (index, value) => {
    if (!this.validIndexInputForArray(index)) this.throwIndexForArrayError();
    this.data[index] = value;
  }

  get = (index) => (this.data[index])

  /* length is implemented as a numeric property (this.length) rather than a
     function / method that retrieves a value */

  search = (value) => { // aka indexOf (not yet indicesOf)
    for (let i = 0; i <= this.end; i++) {
      if (this.get(i) === value) return i;
    }
    return -1;
  }

  lengthen = () => {
    this.data[this.end + 1] = undefined;
    this.end++;
    return ++this.length;
  }

  shorten = () => {
    delete this.data[this.end];
    this.end--;
    return --this.length;
  }

  insert = (index, value) => {
    if (!this.validIndexInputForInsert(index)) this.throwIndexForInsertError();
    this.lengthen();
    this.shiftValues(index, false);
    this.set(index, value);
    return this.length;
  }

  delete = (index) => {
    if (!this.validIndexInputForArray(index)) this.throwIndexForArrayError();
    this.shiftValues(index, true);
    this.shorten();
    return this.length;
  }

  // special case of insert: insert at end
  push = (value) => {
    this.lengthen();
    this.set(this.end, value);
    return this.length;
  }

  // special case of delete: delete at end
  pop = () => {
    let value = this.get(this.end);
    this.shorten();
    return value;
  }

  // special case of delete: delete at start
  shift = () => {
    this.shiftValues(0, true);
    this.shorten();
    return this.length;
  }

  // special case of insert: insert at start
  unshift = (value) => {
    this.lengthen();
    this.shiftValues(0, false);
    this.set(0, value);
    return this.length;
  }

  shiftValues = (index, forward) => {
    if (forward) { // to overwrite at index (and then delete at end)
      for (let i = index; i < this.end; i++) {
        this.set(i, this.get(i+1));
      }
    }
    else { // backward, to make room at index (for then setting value)
      for (let i = this.end; i > index; i--) {
        this.set(i, this.get(i-1));
      }
    }
  }

  validIndexInputForArray = (index) => {
    return (Number.isInteger(index) && index >= 0 && index <= this.end);
  }

  validIndexInputForInsert = (index) => {
    return (Number.isInteger(index) && index >= 0 && index <= this.end + 1);
  }

  throwIndexForArrayError = () => {
    throw new UserException('The input for `index` must be a non-negative ' +
      'integer within the bounds of the referenced array.');
  }

  throwIndexForInsertError = () => {
    throw new UserException('For the `insert` method, the input for ' +
      '`index` must be a non-negative integer within the bounds of the ' +
      'referenced array or just one beyond the maximum index.');
  }

}


/* To use the following code, uncomment below and execute `node Array1.js` in
the shell. */

// const testSimpleArrayErrorHandling = () => {
//   let arr = new SimpleArray(8);
//   arr.set(1, 'a');
//   console.log(`So I can set arr at index=1 to be: arr.get(1) = ${arr.get(1)}`);
//   console.log('But let\'s try setting a non-existent element\'s value...');
//   arr.set(10, 'b');
//   console.log('Do I make it this far? No.');
// }

// testSimpleArrayErrorHandling();
