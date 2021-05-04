// window.activeIntervals = [];
// window.totalIntervalCount = 0;

const setIntervalAndTrack = (func, delay) => {
  let intervalID = setInterval(func, delay);
  window.activeIntervals.push(intervalID);
  window.totalIntervalCount++;
  return intervalID;
};

const clearIntervalAndTrack = (intervalID) => {
  if (window.activeIntervals.includes(intervalID)) {
    let i = window.activeIntervals.lastIndexOf(intervalID);
    window.activeIntervals.splice(i, 1); // remove ID at index i
    window.totalIntervalCount--;
    clearInterval(intervalID);
    return true;
  }
  else {
    clearInterval(intervalID);
    return false;
  };
};

export {setIntervalAndTrack, clearIntervalAndTrack};