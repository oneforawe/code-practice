import React from 'react';
import {connect} from 'react-redux';
import {
  dateZero, timeUnits, timeTypes, timeSpeeds,
  setType, setSpeed, setTimeStdAndDisplay, setTimeStdAndOffset,
  resetDisplay, resetDisplay2,
  modDisplay, startDoubleSpeed} from './state-action-store';
import {setIntervalAndTrack, clearIntervalAndTrack} from './timer-utilities';
import {timeObjfromDateDiff} from './date-utilities';
import './DigitalClock.css';


window.activeIntervals = [];
window.totalIntervalCount = 0;

/*--------------------------
   Controls
----------------------------
 Time:  Normal, Modified
        Reset
 Speed: Stop, Normal, Double
  Hr:  - 0 +
  Min: - 0 +
  Sec: - 0 +
---------------------------*/

class UnconnectedDigitalClock extends React.Component {

  cleanUpIntervals = () => {
    let indexLast = window.activeIntervals.length - 1;
    window.activeIntervals.forEach((intervalID, index) => {
      if (index < indexLast) {
        clearIntervalAndTrack(intervalID);
      };
    });
  };

  getStdTimeNow = () => {
    if (this.props.timeSpeed === timeSpeeds[0]) {
      // Stop => timeDisplay is set as constant, and timeOffset is calculated
      this.props.setTimeStdAndOffset();
    }
    else {
      // Normal/Double => timeOffset is primary, and timeDisplay is calculated
      this.props.setTimeStdAndDisplay();
    };
  };

  doubleDigits = (n) => {
    // for numbers -59 < n < 59
    // add a zero in front of numbers<10
    let sign = (n < 0) ? '-' : '';
    let N = Math.abs(n);
    if (N < 10) { n = `${sign}0${N}`; };
    return n;
  };

  timeString = (dateObj) => {
    let hour = dateObj.getHours();
    let  min = dateObj.getMinutes();
    let  sec = dateObj.getSeconds();
    hour = this.doubleDigits(hour);
    min  = this.doubleDigits(min);
    sec  = this.doubleDigits(sec);
    return `${hour}:${min}:${sec}`;
  };

  visibleIfNonZero = (number, unit) => {
    return number ? `${number} ${unit} ` : '';
  };

  timeDiffString = (dateObjDiff) => {
    let timeDiffObj = timeObjfromDateDiff(dateObjDiff);
    return '' +
      `${this.visibleIfNonZero(timeDiffObj.years, 'years')}` +
      `${this.visibleIfNonZero(timeDiffObj.days,  'days')}` +
      `${this.doubleDigits(timeDiffObj.hours)}:` +
      `${this.doubleDigits(timeDiffObj.minutes)}:` +
      `${this.doubleDigits(timeDiffObj.seconds)}`;
  };

  getStdTimeContinually = (func = this.getStdTimeNow) => {
    this.props.setType(0);
    this.props.setSpeed(1);
    //let intervalID = setIntervalAndTrack(function() {
    setIntervalAndTrack(function() {
      func()
    }, 500);
    //console.log(`getStdTimeContinually: intervalID: ${intervalID}`);
  };

  resetTime = () => {
    if (this.props.timeType !== timeTypes[0]) {
      if (this.props.timeSpeed !== timeSpeeds[2]) {
        this.props.resetDisplay();
      }
      else {
        this.props.resetDisplay2();
      };
    };
  };

  // handleSpeedChange(2)
  startDoubleSpeed = () => {
    if (this.props.timeSpeed !== timeSpeeds[2]) {
      // Need to set timeRef and state.timeSpeed first, once!
      this.props.startDoubleSpeed();
      // Then the right getTimeNow update will occur.
    };
  };

  componentDidMount() {
    this.getStdTimeContinually();
    this.cleanUpIntervals();
  };
  
  isLit(type, reference) {
    return (type === reference) ? 'lit' : '';
  };

  render() {
    return (
      <div className="App">
        <div className="controls-container">
          <div className="controls-title">
            Controls
          </div>
          <div className="control-section">
            <div className="control-title">
              Time
            </div>
            <div className="control-mechanisms-container">
              <div className="control-unit">
                <button onClick={this.resetTime}>Reset</button>
              </div>
              <div className="control-unit">
                <div>
                  <div className="control-light-rim">
                    <div className={`control-light ${this.isLit(
                      this.props.timeType, timeTypes[0])}`}></div>
                  </div>
                </div>
                <div>
                  <span className="control-setting-name">Local/Standard</span>
                </div>
              </div>
              <div className="control-unit">
                <div>
                  <div className="control-light-rim">
                    <div className={`control-light ${this.isLit(
                      this.props.timeType, timeTypes[1])}`}></div>
                  </div>
                </div>
                <div>
                  <span className="control-setting-name">Modified</span>
                </div>
              </div>
            </div>
          </div>
          <div className="control-section">
            <div className="control-title">
              Speed
            </div>
            <div className="control-mechanisms-container">
              <div className="control-unit">
                <div className="control-light-rim">
                  <div className={`control-light ${this.isLit(
                    this.props.timeSpeed, timeSpeeds[0])}`}></div>
                </div>
                <div>
                  <button onClick={() => this.props.setSpeed(0)}>
                    Stop</button>
                </div>
              </div>
              <div className="control-unit">
                <div className="control-light-rim">
                  <div className={`control-light ${this.isLit(
                    this.props.timeSpeed, timeSpeeds[1])}`}></div>
                </div>
                <div>
                  <button onClick={() => this.props.setSpeed(1)}>
                    Normal</button>
                </div>
              </div>
              <div className="control-unit">
                <div className="control-light-rim">
                  <div className={`control-light ${this.isLit(
                    this.props.timeSpeed, timeSpeeds[2])}`}></div>
                </div>
                <div>
                  <button onClick={this.startDoubleSpeed}>
                    Double</button>
                </div>
              </div>
            </div>
          </div>
          <div className="control-section">
            <div className="control-title">
              Mods
            </div>
            <div className="control-mechanisms-container">
              <div className="control-unit row">
                <div>
                  <span className="control-setting-name">
                    Hr
                  </span>
                </div>
                <div className="control-button-group">
                  <button onClick={() => this.props.modDisplay(timeUnits[2], +1)}>
                    {String.fromCharCode(0x002B)}</button> {/* plus */}
                  <button onClick={() => this.props.modDisplay(timeUnits[2],  0)}>
                    0</button>
                  <button onClick={() => this.props.modDisplay(timeUnits[2], -1)}>
                    {String.fromCharCode(0x2013)}</button> {/* minus (en-dash) */}
                </div>
              </div>
              <div className="control-unit row">
                <div>
                  <span className="control-setting-name">
                    Min
                  </span>
                </div>
                <div className="control-button-group">
                  <button onClick={() => this.props.modDisplay(timeUnits[1], +1)}>
                    {String.fromCharCode(0x002B)}</button> {/* plus */}
                  <button onClick={() => this.props.modDisplay(timeUnits[1],  0)}>
                    0</button>
                  <button onClick={() => this.props.modDisplay(timeUnits[1], -1)}>
                    {String.fromCharCode(0x2013)}</button> {/* minus (en-dash) */}
                </div>
              </div>
              <div className="control-unit row">
                <div>
                  <span className="control-setting-name">
                    Sec
                  </span>
                </div>
                <div className="control-button-group">
                  <button onClick={() => this.props.modDisplay(timeUnits[0], +1)}>
                    {String.fromCharCode(0x002B)}</button> {/* plus */}
                  <button onClick={() => this.props.modDisplay(timeUnits[0],  0)}>
                    0</button>
                  <button onClick={() => this.props.modDisplay(timeUnits[0], -1)}>
                    {String.fromCharCode(0x2013)}</button> {/* minus (en-dash) */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clock-face">
          <span>{this.timeString(this.props.timeDisplay)}</span>
        </div>
        <div className="state-internals">
          <div className="state-internals-title">State Internals</div>
          <div className="state-item">
            <div className="state-title">timeStandard:</div>
            <div className="state-readout">
              {this.timeString(this.props.timeStandard)}
            </div>
          </div>
          <div className="state-item">
            <div className="state-title">timeDisplay:</div>
            <div className="state-readout">
              {this.timeString(this.props.timeDisplay)}
            </div>
          </div>
          <div className="state-item">
            <div className="state-title">timeOffset:</div>
            <div className="state-readout">
              {this.timeDiffString(this.props.timeOffset)}
            </div>
          </div>
          <hr/>
          <div className="state-item">
            <div className="state-title">from Date Zero:</div>
            <div className="state-readout">
              {this.timeDiffString(this.props.timeStandard - dateZero)}
            </div>
          </div>
        </div>
      </div>
    );
  };
};


const mapStateToProps = (state) => ({
  timeType: state.timeType,
  timeSpeed: state.timeSpeed,
  timeStandard: state.timeStandard,
  timeDisplay: state.timeDisplay,
  timeOffset: state.timeOffset,
  timeStdRef: state.timeStdRef,
  timeDspRef: state.timeDspRef,
});

const mapDispatchToProps = {
  setType, setSpeed,
  setTimeStdAndDisplay, setTimeStdAndOffset,
  resetDisplay, resetDisplay2,
  modDisplay, startDoubleSpeed,
};

const DigitalClock =
  connect(mapStateToProps, mapDispatchToProps)(UnconnectedDigitalClock);

export {DigitalClock};