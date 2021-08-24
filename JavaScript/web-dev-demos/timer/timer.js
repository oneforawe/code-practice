// Here we define a `Timer' class.
//  (Could call this `TimerCore' so that the whole object, including graphics, is really the "timer".)
// An instance of a Timer will:
//  Act as a count-down timer.
//  Take an HTML text input as an interactive starting/current time.
//  Take an HTML "Start" button input to start/re-start a count-down.
//  Take an HTML "Pause" button input to pause a count-down.
//  Maintain a "beat" (process) on every second interval.
//   Emit a starting noise ("BOOP")
//   Emit a beat noise on every beat (either a "tick" or a final stopping "CLANG".)
//   Emit a stopping noise immediately (with no beat) if the time is zero (0) or negative.
//  Be robust to multiple clicks of the buttons (so only the first press has effect).
//  Communicate (via callbacks) to external JavaScript objects to enable 

class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton   = startButton;
    this.pauseButton   = pauseButton;
    if (callbacks) {
      this.onNewEntry = callbacks.onNewEntry;
      this.onStart    = callbacks.onStart;
      this.onBeat     = callbacks.onBeat;
      this.onTick     = callbacks.onTick;
      this.onPause    = callbacks.onPause;
      this.onStop     = callbacks.onStop;
    }
    this.durationInput.addEventListener('input', this.newEntry);
    this.startButton.addEventListener('click', this.clickStart);
    this.pauseButton.addEventListener('click', this.clickPause);

    // setting the "mini beat" rate in milli-seconds ("MS")
    // (must be a divisor of 1000, a divisor of one second, to allow a "tick" every second)
    // (NOTE: If this is set to 1, the "seconds" get dragged out to be much longer!)
    this.miniBeatMS = 10;
    if (1000%this.miniBeatMS !== 0) throw "miniBeatMS must be a divisor of 1000.";

    // setting the number of displayed decimals on the timer
    this.seeMinimalDecimals = true;
    this.findNeededDecimals = (num) => {
      const str = num.toString();
      // remove trailing zeros
      let truncateBy = 0;
      const revStr = str.split("").reverse().join("")
      for (let digit of revStr) {
        if (digit === "0") truncateBy++;
        else break;
      }
      return 3-truncateBy;
    }
    const minDecimals = this.findNeededDecimals(this.miniBeatMS);
    const maxDecimals = 3;
    this.numDecimals = (this.seeMinimalDecimals ? minDecimals : maxDecimals);

    // mini beat in (certain) fractions of a second ("FS") (the "time base") to be used elsewhere
    this.timeBaseMS = 10 ** this.numDecimals;
    this.miniBeatFS = this.miniBeatMS / (10 ** (3-this.numDecimals) );

    // initializing the timer as not running
    // (code not designed to handle `true' here (yet))
    this.isRunning = false;
  }

  // time remaining in fractions of a second ("FS")
  get newlyEnteredStartTime() {
    return parseFloat(this.durationInput.value).toFixed(3);
  }
  get timeRemainingFS() {
    return parseFloat(this.durationInput.value).toFixed(this.numDecimals) * this.timeBaseMS;
  }
  set timeRemainingFS(timeFS) {
    const time = timeFS / this.timeBaseMS;
    this.durationInput.value = time.toFixed(this.numDecimals);
  }

  decrementTime = () => {
    this.timeRemainingFS -= this.miniBeatFS;
  }

  startNotice = () => {
    console.log("BOOP  (start)");
    if (this.onStart) this.onStart();
  }
  beatNotice = () => {
    console.log("beat");
    if (this.onBeat) this.onBeat();
  }
  tickNotice = () => {
    console.log("tick");
    if (this.onTick) this.onTick();
  }
  pauseNotice = () => {
    console.log("SHH   (pause)");
    if (this.onPause) this.onPause();
  }
  stopNotice = () => {
    console.log("CLANG (stop)");
    if (this.onStop) this.onStop();
  }

  start = () => {
    this.startNotice();
    this.isRunning = true;
    this.autoRunner();
  }
  beat = () => {
    this.beatNotice();
  }
  tick = () => {
    this.tickNotice();
  }
  pause = () => {
    clearInterval(this.miniBeater);
    this.pauseNotice();
    this.isRunning = false;
  }
  stop = () => {
    clearInterval(this.miniBeater);
    this.stopNotice();
    this.isRunning = false;
  }

  newEntry = () => {
    if (this.onNewEntry) this.onNewEntry(this.newlyEnteredStartTime); 
  }

  clickStart = () => {
    if (!this.isRunning) this.start(); 
  }

  clickPause = () => {
    if (this.isRunning) this.pause();
  }

  miniBeatLogic = () => {
    // miniBeat action
    this.decrementTime();
    // beat action, every second (1000 milli-seconds)
    if (this.timeRemainingFS%this.timeBaseMS === 0) {
      this.beat();
      if (this.timeRemainingFS >= this.timeBaseMS) this.tick();
      if (this.timeRemainingFS === 0) this.stop();
    }
  }

  autoRunner = () => {
    // only count-down from positive times
    if (this.timeRemainingFS > 0) {
      this.miniBeater = setInterval(this.miniBeatLogic, this.miniBeatMS);
    }
    else {
      // immediate stop at the initiation of the autoRunner
      // pre-empting the setting of a miniBeater interval object
      this.stop();
    }
  }

}