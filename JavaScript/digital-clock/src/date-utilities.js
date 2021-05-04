export const  secInMS = 1000;
export const  minInMS = 60*secInMS;
export const hourInMS = 60*minInMS;
export const  dayInMS = 24*hourInMS;
export const yearInMS = 365*dayInMS;

//export {secInMS, minInMS, hourInMS, dayInMS, yearInMS};
//import {secInMS, minInMS, hourInMS, dayInMS, yearInMS} from './date-utilities';

export function timeObjfromDateDiff(dateDiff) {
  let years, days, hours, minutes, seconds, milliseconds, excessMS;
  years = Math.trunc(dateDiff/yearInMS);
  excessMS = dateDiff % yearInMS;
  days = Math.trunc(excessMS/dayInMS);
  excessMS = excessMS % dayInMS;
  hours = Math.trunc(excessMS/hourInMS);
  excessMS = excessMS % hourInMS;
  minutes = Math.trunc(excessMS/minInMS);
  excessMS = excessMS % minInMS;
  seconds = Math.trunc(excessMS/secInMS);
  milliseconds = excessMS % secInMS;
  return {years, days, hours, minutes, seconds, milliseconds};
};

//import {timeObjfromDateDiff} from './date-utilities';