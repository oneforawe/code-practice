import React from 'react';
import {connect} from 'react-redux';
import {colorsStatesArr,
  resetState, setPowerOn, setPowerOff,
  stepForward, setRunning, setTimeoutID} from './state-action-store';
import './TrafficLights.css';


class UnconnectedTrafficLights extends React.Component {

  sequenceRecursion = () => {
    this.props.setTimeoutID(null);
    this.props.stepForward(); // need to use await or use thunk
    this.setSequenceTimer();
  };
  setSequenceTimer = () => {
    let timeoutID;
    switch (this.props.colorsState) {
      case 0:
        timeoutID = setTimeout(this.sequenceRecursion, 1500);
        this.props.setTimeoutID(timeoutID);
        break;
      case 1:
        timeoutID = setTimeout(this.sequenceRecursion, 500);
        this.props.setTimeoutID(timeoutID);
        break;
      case 2:
        timeoutID = setTimeout(this.sequenceRecursion, 500);
        this.props.setTimeoutID(timeoutID);
        break;
      case 3:
        timeoutID = setTimeout(this.sequenceRecursion, 1500);
        this.props.setTimeoutID(timeoutID);
        break;
      case 4:
        timeoutID = setTimeout(this.sequenceRecursion, 500);
        this.props.setTimeoutID(timeoutID);
        break;
      case 5:
        timeoutID = setTimeout(this.sequenceRecursion, 500);
        this.props.setTimeoutID(timeoutID);
        break;
      default:
        break;
    };
  };

  handlePower = () => {
    if (this.props.isRunning) {
      this.pauseSeq();
    };
    if (this.props.isOn) {
      this.props.setPowerOff();
      this.resetLight();
    }
    else {
      this.props.setPowerOn();
    };
  };
 
  runSeq = () => {
    if (this.props.isOn && !this.props.isRunning) {
      this.props.setRunning(true);
      this.props.stepForward();
      this.sequenceRecursion();
    };
  };

  pauseSeq = () => {
    if (this.props.timeoutID) {
      clearTimeout(this.props.timeoutID);
      this.props.setTimeoutID(null);
      this.props.setRunning(false);
    };
  };

  resetLight = () => {
    this.props.resetState();
  };

  stepSeq = () => {
    if (this.props.isOn) {
      if (this.props.isRunning) {
        clearTimeout(this.props.timeoutID);
        this.props.setTimeoutID(null);
        this.sequenceRecursion();
      }
      else {
        this.props.stepForward();
      };
    };
  };

  render() {
    let colorLight0 = colorsStatesArr[this.props.colorsState].light0;
    let colorLight1 = colorsStatesArr[this.props.colorsState].light1;
    return (
      <div className="light-and-control-container">
        <div className="controls-container">
          <div className="power-controls">
            <div className="control-light-rim">
              <div className={`small-circle ${isLit(this.props.isOn, 'orange', 'orange')} orange`}></div>
            </div>
            <button onClick={this.handlePower}>Power</button>
          </div>
          <div className="sequence-controls">
            <div className="control-light-rim">
              <div className={`small-circle ${isLit(this.props.isRunning, 'orange', 'orange')} orange`}></div>
            </div>
            <button onClick={this.runSeq}>Run Seq</button>
            <button onClick={this.pauseSeq}>Stop</button>
          </div>
          <div className="stepping-control">
            <div className="control-light-rim hidden"></div>
            <button onClick={this.stepSeq}>Step</button>
          </div>
        </div>
        <div className="lights-container">
          <TrafficLight id="light0" isOn={this.props.isOn} colorState={colorLight0}/>
          <TrafficLight id="light1" isOn={this.props.isOn} colorState={colorLight1}/>
        </div>
      </div>
    );
  };
};

const TrafficLight = ({isOn, colorState}) => {
  return (
      <div className="traffic-light">
        <div className={`circle ${isLit(isOn, 'red', colorState)} red`}></div>
        <div className={`circle ${isLit(isOn, 'yellow', colorState)} yellow`}></div>
        <div className={`circle ${isLit(isOn, 'green', colorState)} green`}></div>
      </div>
  );
};

const isLit = (isOn, lightColor, colorState) => {
  return (isOn && (lightColor === colorState)) ? 'lit' : '';
};


const mapStateToProps = (state) => ({
  colorsState: state.colorsState,
  isOn: state.isOn,
  isRunning: state.isRunning,
  timeoutID: state.timeoutID,
});
const mapDispatchToProps = {
  resetState,
  setPowerOn,
  setPowerOff,
  stepForward,
  setRunning,
  setTimeoutID
};

const TrafficLights =
  connect(mapStateToProps, mapDispatchToProps)(UnconnectedTrafficLights);


export {TrafficLights};