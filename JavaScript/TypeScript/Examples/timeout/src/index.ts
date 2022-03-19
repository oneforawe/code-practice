import util from 'util';


const sayHi = (number: number) => () => {
  console.log(`hi world - ${number}`);
}
const timeoutsArray: Array<string> = [];


const seconds = 1; // unit context
const millisecondsPerSecond = 1000; // unit conversion
const waitTimeInMs = (3 * seconds) * millisecondsPerSecond;

const timeoutObj1 = setTimeout(sayHi(1), waitTimeInMs);

console.log('timeoutObj1', timeoutObj1);

const inpectOptions = {
  colors: true,
  depth: Infinity,
  compact: false,
  showHidden: true,
  showProxy: true,
  getters: true,
};
console.log(util.inspect(timeoutObj1, inpectOptions));

// I get an error with this:
console.log('JSON.stringify(timeoutObj1)', JSON.stringify(timeoutObj1));
// So, how does one stringify such a circular object?


// Work in progress:

// My intention was to be able to pass around a stringified record of timeouts
// so they can be cancelled after being un-stringified.
// timeoutsArray.push(JSON.stringify(timeoutObj1));

// const cancelTimeout1 = () => {
//   const timeoutIndex = timeoutsArray.findIndex(timeoutNumber);
//   if ()
// }


const timeoutObj2 = setTimeout(sayHi(2), waitTimeInMs);