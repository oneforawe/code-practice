import {createStore} from 'redux';


//    Light timer chain reaction
// --------------------------------
//     Light 0         Light 1
//  -------------   -------------
//     red: 0.5s       red: 0.5s
//   green: 1.5s       red: 1.5s
//  yellow: 0.5s       red: 0.5s
//     red: 0.5s       red: 0.5s
//     red: 1.5s     green: 1.5s  (use this as first state)
//     red: 0.5s    yellow: 0.5s  (or use this as first state)
// --------------------------------
//  red (3s), green (1.5s), yellow (0.5s)

export const colorsStatesArr = [
  {light0: 'red',    light1: 'green'},
  {light0: 'red',    light1: 'yellow'},
  {light0: 'red',    light1: 'red'},
  {light0: 'green',  light1: 'red'},
  {light0: 'yellow', light1: 'red'},
  {light0: 'red',    light1: 'red'},
];
const numColorStates = colorsStatesArr.length;

const stateInitial = {
  colorsState: 0,
  isRunning: false,
  timeoutID: null
};


const RESET_STATE    = 'RESET_STATE';
const SET_POWER_ON   = 'SET_POWER_ON';
const SET_POWER_OFF  = 'SET_POWER_OFF';
const STEP_FORWARD   = 'STEP_FORWARD';
const SET_RUNNING    = 'SET_RUNNING';
const SET_TIMEOUT_ID = 'SET_TIMEOUT_ID';


export function resetState() {
  return {type: RESET_STATE};
};
export function setPowerOn() {
  return {type: SET_POWER_ON};
};
export function setPowerOff() {
  return {type: SET_POWER_OFF};
};
export function stepForward() {
  return {type: STEP_FORWARD};
};
export function setRunning(bool) {
  return {type: SET_RUNNING, bool: bool};
};
export function setTimeoutID(timeoutID) {
  return {type: SET_TIMEOUT_ID, timeoutID: timeoutID};
};


const reducer = (state = stateInitial, action) => {
  switch (action.type) {
    case RESET_STATE:
      return stateInitial;
    case SET_POWER_ON:
      return {...state, isOn: true};
    case SET_POWER_OFF:
      return {...state, isOn: false};
    case STEP_FORWARD:
      let newColorsState = (state.colorsState + 1) % numColorStates;
      return {...state, colorsState: newColorsState};
    case SET_RUNNING:
      return {...state, isRunning: action.bool};
    case SET_TIMEOUT_ID:
      return {...state, timeoutID: action.timeoutID};
    default:
      return state;
  };
};

export const store = createStore(reducer);