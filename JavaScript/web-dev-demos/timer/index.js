// timer input/output
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

// timer graphics
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let dashOffset = 0; // 0 pixel initialization
let latestEnteredStartTime = durationInput.getAttribute('value');  // default

// define (but don't yet assign) shrinker (an "interval")
// to allow logic depending on if it has been assigned yet
let shrinker

function updateBorder() {
  const remainingTime = parseFloat(durationInput.value);
  dashOffset = -perimeter*( 1 - (remainingTime/latestEnteredStartTime) );
  // = 0           at time = latestEnteredStartTime
  // = -perimeter  at time = 0
  circle.setAttribute('stroke-dashoffset', dashOffset);
}
function startBorderShrinker() {
  shrinker = setInterval(updateBorder, 1);
}
function stopBorderShrinker() {
  clearInterval(shrinker);
}

const timer = new Timer(durationInput, startButton, pauseButton, {
    onNewEntry(newlyEnteredStartTime) {
      console.log('HEY JS WORLD: THE TIMER GOT A NEW ENTRY!');
      latestEnteredStartTime = newlyEnteredStartTime;
      if (shrinker) stopBorderShrinker();
      updateBorder();
      //if (shrinkerOn === true) startBorderShrinker();
    },
    onStart() {
      console.log('HEY JS WORLD: THE TIMER STARTED!');
      startBorderShrinker();
    },
    onBeat() {
      console.log('HEY JS WORLD: THE TIMER BEATED!');
    },
    onTick() {
      console.log('HEY JS WORLD: THE TIMER TICKED!');
    },
    onPause() {
      console.log('HEY JS WORLD: THE TIMER PAUSED!');
      stopBorderShrinker();
    },
    onStop() {
      console.log('HEY JS WORLD: THE TIMER STOPPED!');
      stopBorderShrinker();
      updateBorder(); //  last update
    }
  });