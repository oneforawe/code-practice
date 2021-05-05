/*
  Basic Usage: Enter a Node.js REPL by executing `node` in the shell. Then
    execute `.load Array1.js` in the REPL to run the file. (It also prints out
    the file in a really messy manner, unfortunately.) Then the data structure
    can be used by executing commands such as:
    `let arr1 = new SimpleManualArray()`
    `let arr2 = new SimpleManualArray(8)`
    `arr2.set(1, 're')`
    etc

  NOTE: Data structures do not seem to have standardized universal definitions
        in information technology / computer science, and they often vary to
        some degree across different programming languages and implementations.
        What follows is my own synthesis of what I've encountered so far in my
        study of data structures and data types.

  Data Structure:
    array
      - a linearly-ordered collection of elements (ie, "values"), where the
        elements are independent in the general case, where they are labeled by
        (non-negative integer) index (for us, starting at zero) for retrieval
        of each value by index (like finding a house by its address), and the
        number of elements in the array is called the length or size of the
        array.  An empty array, with no elements, has size/length zero.

      - We'll call the zero-index position the "start" position, although it
        could be called the head, front, top, bottom, etc.  We'll call the
        maximum-index position the "end" position.

      - The foundational notion of an array data structure seems to be a
        "static" or constant-size array, taking up contiguous memory in a
        computer, making it mathematically easy to retrieve each element by
        index because the memory address for each element is thus a simple
        function of the "start" element address, the index, and the (constant/
        uniform) memory-size alloted for each element value.  Such a function
        might look as follows (although it could be more complex):
          (memory address for index i)
            = (memory address for index 0) + i * (memory-size for each element)

      - Arrays can be "dynamic" as well as "static", where the size of the
        array can be changed as it is in use (between being declared and
        deleted or garbage-collected).  We call this dynamism feature an
        "extension" to the foundational array concept, so the functions or
        "methods" that implement this feature are called "extenders".

  Methods (2 main, 2 helper, 2 intermediate-extender, ~2 extender):
    set(i, v): assign a value v at index i  (length of array not modified)
               return v ???
    get(i):    get the value at index i     (length of array not modified)
               return that value.

    length:   return the number of elements in the array (without modification)
    search(v):  search for the element with a value v; if there is such an
                element, return its index; otherwise return -1. Aka indexOf(v).

    lengthen(): increase the number of elements in the array; this could take
                an input for how many elements to add, or it could always
                increase by one, or it could be size dependent (say, doubling
                the length of the array when increasing beyond its current
                limit, which would be a power of two).
    shorten():  decrease the number of elements in the array, analogously to
                lengthen().

    insert(i, v): add a new element (by lengthening the array and shifting
                  other elements if necessary to make room in the appropriate
                  location) with value v at index i.
    delete(i):  remove the element at index i (by shortening the array and
                shifting elements if necessary)

  Derivative methods (6):
    insert, delete, push, pop, shift, unshift

  Example:
    A prioritized "to-do" list can be implemented as an array, with, say, the
    highest priority to-do item placed at index zero, and lower priority items
    placed with ascending indices.

  THIS IMPLEMENTATION:
    In this implementation, a native JavaScript Object structure is used to
    instantiate the kind of array data structure that's described above.
    Another property, this.end, which is the last index in the array (equal to
    this.length - 1) is defined for conceptual simplicity.
*/


function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}


class SimpleManualArray {

  // start with a defined size of array, although with empty/undefined elements
  constructor(lengthInitial = 0) {
    this.data = {};
    for (let i = 0; i < lengthInitial; i++) {
      this.data[i] = undefined;
    };
    this.length = lengthInitial;
    this.end = lengthInitial - 1;
  }
 
  // Only set already-existing already-defined element spaces.
  set = (index, value) => {
    if (!this.validIndexInput(index)) this.handleIndexError();
    this.data[index] = value;
  }

  get = (index) => (this.data[index])

  /* length is implemented as a numeric property (this.length) rather than a
     function / method that retrieves a value */

  search = (value) => { // aka indexOf (not yet indicesOf)
    for (let i = 0; i <= this.end; i++) {
      if (this.data[i] === value) return i;
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

  delete = (index) => {
    if (!this.validIndexInput(index)) return -1;
    this.shiftValues(index, true);
    return this.shorten();
  }

  insert = (index, value) => {
    if (!this.validIndexInput(index)) return -1;
    let length = this.lengthen();
    this.shiftValues(index, false);
    this.set(index, value);
    return length;
  }

  // special case of insert: insert at end
  push = (value) => {
    let length = this.lengthen();
    this.set(this.end, value);
    return length;
  }

  // special case of delete: delete at end
  pop = () => {
    let value = this.data[this.end];
    this.shorten();
    return value;
  }

  // special case of delete: delete at start
  shift = () => {
    this.shiftValues(0, true);
    return this.shorten();
  }

  // special case of insert: insert at start
  unshift = (value) => {
    let length = this.lengthen();
    this.shiftValues(0, false);
    this.set(0, value);
    return length;
  }

  shiftValues = (index, forward) => {
    if (forward) { // to overwrite at index (and then delete at end)
      for (let i = index; i < this.end; i++) {
        this.data[i] = this.data[i+1];
      }
    }
    else { // backward, to make room at index (for then setting value)
      for (let i = this.end; i > index; i--) {
        this.data[i] = this.data[i-1];
      }
    }
  }

  validIndexInput = (index) => {
    return (Number.isInteger(index) && index >= 0 && index <= this.end);
  }

  throwIndexError = () => {
    return new UserException('The first input, `index`, must be a ' +
      'non-negative integer within the bounds of the current existing array ' +
      `\`${this.constructor.name}\`.`);
  }

  handleIndexError = () => {
    try { throw this.throwIndexError(); }
    catch (error) { console.error(`\n  ${error.name} : ${error.message}\n`); };
  }

}