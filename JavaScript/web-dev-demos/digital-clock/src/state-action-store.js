import {createStore} from 'redux';
import {secInMS, minInMS, hourInMS} from './date-utilities';


export const timeTypes = ['local-standard-time', 'non-local-time'];
export const timeSpeeds = ['zero-speed', 'normal-speed', 'double-speed'];
export const timeUnits = ['sec', 'min', 'hour'];
const conversionToMS = {'sec': secInMS, 'min': minInMS, 'hour': hourInMS};

// new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
const timeZero = new Date(1970, 1, 1, 0, 0, 0, 0);
export const dateZero = new Date(0); // GMT, not equivalent to LOCAL timeZero

/*
    Std = Standard/Local Clock Time,  Dsp = Display Clock Time
 ---------------------------------------------------------------> clock time(s)
                             (double speed)
actual       |->                   |-->
time 1      Std                   Dsp
              <------------------->
                    Offset

actual       |         |->         |                   |-->
time 2     StdRef     Std        DspRef               Dsp
              <------->             <----------------->
              StdOffset                  DspOffset
                        <----------------------------->
                                    Offset

  Dsp = DspRef + DspOffset
      = DspRef + (speed) * (StdOffset)

  Offset = Dsp - Std
*/

const stateInitial = {
  timeType: timeTypes[0],
  timeSpeed: timeSpeeds[1],
  timeStandard: timeZero,
  timeDisplay: timeZero,
  timeOffset: timeZero - timeZero,
  timeStdRef: timeZero,
  timeDspRef: timeZero,
};

// Action Constants
const SET_TYPE  = 'SET_TYPE';
const SET_SPEED = 'SET_SPEED';
const SET_TIME_STD_AND_DISPLAY = 'SET_TIME_STD_AND_DISPLAY';
const SET_TIME_STD_AND_OFFSET  = 'SET_TIME_STD_AND_OFFSET';
const RESET_DISPLAY     = 'RESET_DISPLAY';
const RESET_DISPLAY2    = 'RESET_DISPLAY2';
const MOD_DISPLAY       = 'MOD_DISPLAY';
const START_DOUBLE_SPEED = 'START_DOUBLE_SPEED';

// Action Creators
export function setType(index) {
  return {type: SET_TYPE, index};
};
export function setSpeed(index) {
  return {type: SET_SPEED, index};
};
export function setTimeStdAndDisplay() {
  return {type: SET_TIME_STD_AND_DISPLAY};
};
export function setTimeStdAndOffset() {
  return {type: SET_TIME_STD_AND_OFFSET};
};
export function resetDisplay() {
  return {type: RESET_DISPLAY};
};
export function resetDisplay2() {
  return {type: RESET_DISPLAY2};
};
export function modDisplay(unit, direction) {
  return {type: MOD_DISPLAY, unit, direction};
};
export function startDoubleSpeed(dateObjRef) {
  return {type: START_DOUBLE_SPEED, dateObjRef};
};


function isEqual(dateObj1, dateObj2) {
  return (
    (dateObj1[Symbol.toPrimitive]('number') === dateObj2[Symbol.toPrimitive]('number')) ?
    true
    :
    false
  );
};

function timeTypeFromObjs(dateObjDsp, dateObjStd) {
  return isEqual(dateObjDsp, dateObjStd) ? timeTypes[0] : timeTypes[1];
};


const reducer = (state = stateInitial, action) => {
  let dateObjStd, timeType, timeDisplay, timeOffset, millisecondsChange;
  switch (action.type) {

    case SET_TYPE:
      return {...state, timeType: timeTypes[action.index]};

    case SET_SPEED:
      return {...state, timeSpeed: timeSpeeds[action.index]};

    case SET_TIME_STD_AND_DISPLAY:
      // Normal => timeOffset is primary, and timeDisplay is calculated
      // Double => refTime is primary, timeOffset and timeDisplay are calculated
      dateObjStd = new Date();
      if (state.timeSpeed === timeSpeeds[2]) {
        let timeOffsetRef = 2 * (
          dateObjStd[Symbol.toPrimitive]('number') -
          state.timeStdRef[Symbol.toPrimitive]('number')
        );
        timeDisplay = new Date(
          state.timeDspRef[Symbol.toPrimitive]('number') + timeOffsetRef
        );
        timeOffset =
          timeDisplay[Symbol.toPrimitive]('number') -
          dateObjStd[Symbol.toPrimitive]('number');
      }
      else {
        timeOffset = state.timeOffset;
        timeDisplay = new Date(
          dateObjStd[Symbol.toPrimitive]('number') + timeOffset
        );
      };
      timeType = timeTypeFromObjs(timeDisplay, dateObjStd);
      return {
        ...state,
        timeType,
        timeStandard: dateObjStd,
        timeDisplay,
        timeOffset,
      };

    case SET_TIME_STD_AND_OFFSET:
      // Stop => timeDisplay is set as primary, and timeOffset is calculated
      dateObjStd = new Date();
      timeOffset =
        state.timeDisplay[Symbol.toPrimitive]('number') -
        dateObjStd[Symbol.toPrimitive]('number');
      timeType = timeTypeFromObjs(state.timeDisplay, dateObjStd);
      return {...state, timeType, timeStandard: dateObjStd, timeOffset};

    case RESET_DISPLAY:
      // at stop or normal speed
      return {
        ...state,
        timeType: timeTypes[0],
        timeDisplay: state.timeStandard,
        timeOffset: 0,
      };

    case RESET_DISPLAY2:
      // double speed
      return {
        ...state,
        timeType: timeTypes[0],
        timeDisplay: state.timeStandard,
        timeOffset: 0,
        timeStdRef: state.timeStandard,
        timeDspRef: state.timeStandard,
      };

    case MOD_DISPLAY:
      let timeDspRef, timeOffsetChange;
      if (action.direction) {
        millisecondsChange = action.direction * conversionToMS[action.unit];
        timeDisplay = new Date(
          state.timeDisplay[Symbol.toPrimitive]('number') + millisecondsChange
        );
        timeDspRef = new Date(
          state.timeDspRef[Symbol.toPrimitive]('number') + millisecondsChange
        );
        timeOffset = state.timeOffset + millisecondsChange;
      }
      else {
        switch (action.unit) {
          case timeUnits[0]:
            timeDisplay = new Date(state.timeDisplay);
            timeDspRef = new Date(state.timeDspRef);
            break;
          case timeUnits[1]:
            timeDisplay = new Date(state.timeDisplay);
            timeDspRef = new Date(state.timeDspRef);
            break;
          case timeUnits[2]:
            timeDisplay = new Date(state.timeDisplay);
            timeDspRef = new Date(state.timeDspRef);
            break;
          default:
            console.log(`Need an appropriate value of action.unit, ` +
              `not ${action.unit}`);
            break;
        };
        timeOffsetChange =
          timeDisplay[Symbol.toPrimitive]('number') -
          state.timeDisplay[Symbol.toPrimitive]('number');
        timeOffset = state.timeOffset + timeOffsetChange;
      };
      timeType = timeTypeFromObjs(timeDisplay, state.timeStandard);
      return {
        ...state,
        timeType,
        timeDisplay,
        timeOffset,
        timeDspRef,
      };

    case START_DOUBLE_SPEED:
      return {
        ...state,
        timeSpeed: timeSpeeds[2],
        timeStdRef: state.timeStandard,
        timeDspRef: state.timeDisplay,
      };

    default:
      return state;
  };
};

export const store = createStore(reducer);
