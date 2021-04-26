//import {exec} from 'child_process';
/*
  Basic Usage: Try this (even though it doesn't completely work): execute this
    in the shell:
    `node Queue_draft.js`
    (Undesirably, the REPL that gets started doesn't have access to the data
    structure.)
  Data Structure
  queue - a "line", FIFO (first in, first out)
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
  methods (2 main, ~2 helper):
    enqueue: add an element to the "back"
    dequeue: remove an element from the "front"
    length: return the number of elements in the queue (without modifying the queue)
    peek: return the value of the first element (without modifying the queue)

  Example:
    Customers waiting in line for a service, with a policy of "first come,
    first served".  This can be modeled with a "queue" data structure, where
    each customer is modeled as an element in the queue, they enqueue to get
    into the line, and they dequeue to then receive their awaited service.
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

console.log("Data Structure Demo: queue")
console.log('\n  See the preamble comments in the Queue.js file ' +
  'for an explanation of the "queue" data structure.')
console.log(`\n  Let's make the following definition and then use it in a REPL:\n`)

//console.log(Queue.toString())
let space = '    '
console.log(space + Queue.toString().replaceAll(/\n/g, '\n' + space))
console.log('\n')





// exec('node', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// !function(){
//   var repl = require('repl'),
//     spawn = require('child_process').spawn;

//   var child_spawned = false;
//   function eval(cmd, context, filename, callback) {
//     // don't start a new child process if one is already running
//     if(child_spawned) return;

//     try {
//       var child = spawn('node', ['./question.js']);
//     } catch(error) {throw new Error('Something wronged.')};
//     child_spawned = true;

//     // pipe child output back up to parent process
//     child.stdout.pipe(process.stdout);
//     // pipe the main process input to the child process
//     process.stdin.pipe(child.stdin);

//     child.on('close', function (code) {
//       console.log('closing')
//       callback(code, 'closing callback');

//       // mark child process as closed
//       child_spawned = false;

//       // resume the main process stdin after child ends so the repl continues to run
//       process.stdin.resume();
//     });

//   }

//   repl.start({
//     prompt: 'repl> ',
//     input: process.stdin,
//     output: process.stdout,
//     eval: eval
//   }).on('exit', function () {
//     process.exit();
//   });

// }();




const startREPL = () => {
  var repl = require("repl"),
    spawnSync = require('child_process').spawnSync;

  function eval(cmd, context, filename, callback) {
    //spawnSync('node', ['./question.js'], { stdio: 'inherit' });
    console.log(cmd)
    cmd;
    console.log("...How do I actually execute this code, rather than simply " +
      "printing it out?  And how do I get access to the data structure that " +
      "was defined before entering this REPL?\n")
      /* And how do I make the REPL as nice as the default shell node REPL,
         which has code/syntax highlighting/coloring and previews the output? */
    callback();
  }

  repl.start({
    prompt: 'repl> ',
    input: process.stdin,
    output: process.stdout,
    eval: eval
  }).on('exit', function () {
    console.log("\nDone with that. Now it would be nice to ask if you want " +
      "to do it again or even play with a different data structure...")
    //process.exit();
  });

};

startREPL();

//console.log('After the REPL. Print this!')