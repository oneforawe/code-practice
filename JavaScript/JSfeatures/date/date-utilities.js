import moment from 'moment'
import mtimezone from 'moment-timezone'


// export const  secInMS = 1000;         // one second in milliseconds
// export const  minInMS = 60*secInMS;   // one minute in milliseconds
// export const hourInMS = 60*minInMS;   // one hour in milliseconds
// export const  dayInMS = 24*hourInMS;  // one day in milliseconds
// export const yearInMS = 365*dayInMS;  // one year in milliseconds

//export {secInMS, minInMS, hourInMS, dayInMS, yearInMS};
//import {secInMS, minInMS, hourInMS, dayInMS, yearInMS} from './date-utilities';

// export function timeObjfromDateDiff(dateDiff) {
//   let years, days, hours, minutes, seconds, milliseconds, excessMS;
//   years = Math.trunc(dateDiff/yearInMS);
//   excessMS = dateDiff % yearInMS;
//   days = Math.trunc(excessMS/dayInMS);
//   excessMS = excessMS % dayInMS;
//   hours = Math.trunc(excessMS/hourInMS);
//   excessMS = excessMS % hourInMS;
//   minutes = Math.trunc(excessMS/minInMS);
//   excessMS = excessMS % minInMS;
//   seconds = Math.trunc(excessMS/secInMS);
//   milliseconds = excessMS % secInMS;
//   return {years, days, hours, minutes, seconds, milliseconds};
// };

//import {timeObjfromDateDiff} from './date-utilities';

export const months = {
  full: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  abbr: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
}

export const days = {
  full: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  abbr: [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ],
  a: [
    'U',
    'M',
    'T',
    'W',
    'R',
    'F',
    'S'
  ]
}

var abbrs = {
  EST : 'Eastern Standard Time',
  EDT : 'Eastern Daylight Time',
  CST : 'Central Standard Time',
  CDT : 'Central Daylight Time',
  MST : 'Mountain Standard Time',
  MDT : 'Mountain Daylight Time',
  PST : 'Pacific Standard Time',
  PDT : 'Pacific Daylight Time',
};

mtimezone.fn.zoneName = function () {
  let abbr = this.zoneAbbr()
  return abbrs[abbr] || abbr
}

export function localTimeStamp(dateObj) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const localTimeZoneModeAbbr = mtimezone.tz(dateObj,localTimeZone).format('z')
  return `` +
    `${moment(dateObj).format(`` +
      `YYYY-MM-DD[T]HH:mm:ss.SSS (UTCZ|[${localTimeZoneModeAbbr}]) x`
      )}`
}

export function localTimeStampShort(dateObj) {
  return `` +
    `${moment(dateObj).format(`` +
      `YYYY-MM-DD[T]HH:mm:ss.SSS`
      )}`
}

export function localTimeStampLong(dateObj) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const localTimeZoneMode = mtimezone.tz(dateObj, localTimeZone).format('zz')
  return `` +
    `${moment(dateObj).format(`` +
      `YYYY-MM-DD (YYYY [Week] WW MMMM DD dddd) HH:mm:ss.SSS ` +
      `(UTCZ | [${localTimeZone}] | [${localTimeZoneMode}]) x`)}`
}


export function localTimeStampA(dateObj) {
  return `` +
    `${dateObj.toLocaleString("default", { year:  "numeric" })}-` +
    `${dateObj.toLocaleString("default", { month: "2-digit" })}-` +
    `${dateObj.toLocaleString("default", { day:   "2-digit" })} ` +
    `(` +
    `${dateObj.toLocaleString("default", { year:  "numeric" })} ` +
    `${dateObj.toLocaleString("default", { month:   "short" })} ` +
    `${dateObj.toLocaleString("default", { day:   "2-digit" })} ` +
    `${dateObj.toLocaleString("default", { weekday: "short" })}`  +
    `) ` +
    `${dateObj.toLocaleString("default", { hour:   "2-digit", hour12: false })}:` +
    `${dateObj.toLocaleString("default", { minute: "2-digit" })}:` +
    `${dateObj.toLocaleString("default", { second: "2-digit" })}.` +
    `${dateObj.toLocaleString("default", { fractionalSecondDigits: 3 })}`
    //`${dateObj.toLocaleString("default", { timeZone: "PST", timeZoneName: 'long' })} ` +
    //` ** ${dateObj.toTimeString()} ** ` +
    //`${new Intl.DateTimeFormat('en-US', { timeZone: "PST", timeZoneName: "long" } ).format(dateObj)} `
    //`${dateObj.getTimezoneOffset("default", { timeZoneName: 'long' })} ` +
}

export function localTimeStampB(dateObj) {
  return `` +
    `${dateObj.getFullYear()} ` +
    `${months.full[dateObj.getMonth()]} ` +
    `${dateObj.getDate()} ` +
    `${days.full[dateObj.getDay()]} ` +
    `${dateObj.getHours()}:` +
    `${dateObj.getMinutes()}:` +
    `${dateObj.getSeconds()}.` +
    `${dateObj.getMilliseconds()}`
}