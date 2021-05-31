
let x = 1, y = 2;
console.log(`let x = 1, y = 2;`)
console.log(`x = ${x}, y = ${y}`)

[x,y][0] = 5; // ERROR when executed by node
//  "TypeError: Cannot read property '2' of undefined
//       at Object.<anonymous> (array-assignment.js:7:1)"
console.log(`[x,y][0] = 5;`)
console.log(`x = ${x}, y = ${y}`)

console.log('In the console, no error, even though x=1 still and it seems like this would then mean 1 = 5.')
console.log('Can you explain what is going on here?')


/* A new array is generated and we are selecting the first element in that
** array, assigning it a new value, and then just throwing it away. */

// z = [x,y];
// console.log(`z = [x,y];`)
// console.log(`z = ${z}`)

// z[0] = 5;
// console.log(`z = ${z}`)