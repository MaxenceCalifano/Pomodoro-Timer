import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Button from "./Components/Button.js";
import Controls from "./Components/Controls";
import "./index.css";
let countDown;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.startStop = this.startStop.bind(this);
    this.decr = this.decr.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  timerOffColor = "rgb(334, 100, 100)";
  breakColor = "rgb(134, 200, 115)";

  setTimerOncolor() {
    if (this.props.currentTimer === "Session") {
      document.body.style.backgroundColor = "rgb(134, 118, 239)";
    } else {
      document.body.style.backgroundColor = this.breakColor;
    }
  }
  setTimerOffColor() {
    document.body.style.backgroundColor = this.timerOffColor;
  }
  resetBkgColor() {
    document.body.style.backgroundColor = " rgb(200, 239, 239)";
  }
  decrementSessionOrBreak() { //choose wich timer to decrement
    this.props.sessionOrBreak();
     this.setTimerOncolor();
  }
  decr() {
    if (this.props.minutesLeft === 0 && this.props.secondesLeft === 0) {
      document.getElementById("beep").play();
      this.decrementSessionOrBreak();
    } else {
      this.props.decrementTime();
    }
  }

  startStop() {
    this.props.playPause();
    if (this.props.onOff) {
      clearInterval(countDown);
      this.setTimerOffColor();
      //repasser onOff en false
    } else {
      countDown = setInterval(this.decr, 1000);
      this.setTimerOncolor();
    }
  }
  reset() {
    if (this.props.onOff) {
      this.startStop();
    }
    this.props.reset();
    
    let sound = document.getElementById("beep");
    sound.pause();
    this.resetBkgColor();
    sound.currentTime = 0;
  }
 
  render() {
    return (
      <div id="box">
        <h1 style={{ textAlign: "center" }}>Pomodoro Timer </h1>
        <div id="titles">
          <p id="break-label">Break Length</p>
          <p id="session-label">Session Length</p>
        </div>

        <div id="container">
          <Button
            id="break-decrement"
            operator="-"
            modifyLength={this.props.decrement}
          />

          <p id="break-length">{this.props.breakLength}</p>

          <Button
            id="break-increment"
            operator="+"
            modifyLength={this.props.increment}
          />

          <Button
            id="session-decrement"
            operator="-"
            modifyLength={this.props.decrement}
          />

          <p id="session-length">{this.props.sessionLength}</p>

          <Button
            id="session-increment"
            operator="+"
            modifyLength={this.props.increment}
          />
        </div>
        <div id="timer">
          <p id="timer-label" style={{ textAlign: "center" }}>
            {this.props.currentTimer}
          </p>
          <p id="time-left" style={{ textAlign: "center" }}>
            {this.props.minutesLeft > 9
              ? this.props.minutesLeft
              : "0".concat(this.props.minutesLeft)}
            :
            {this.props.secondesLeft > 9
              ? this.props.secondesLeft
              : "0".concat(this.props.secondesLeft)}
          </p>
          <div style={{ textAlign: "center" }}>
            <Controls
              id="start_stop"
              timerControl={this.startStop}
              controlName={
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                    <path
                        d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"
                    />
                  </svg>
                  <svg style ={{marginLeft: -10}}xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                </div>
              }
            />
            <Controls
              id="reset"
              timerControl={this.reset}
              controlName={<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><g/><path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z"/></g></svg>}
            />
          </div>

         <audio
            id="beep"
           src='http://old.minford.k12.oh.us/WebsiteGraphics/backgrounds/GraphicsFromDriveR/sounds/SoundEffects/GONG.WAV'
           type="audio/mpeg"
           preload="auto"
          />
        </div>
      </div>
    );
  }
}

const decrementActionCreator = (buttonId) => {
  return {
    type: 'DECREMENT',
    payload: buttonId
  }
}
const incrementActionCreator = (buttonId) => {
  return {
    type: 'INCREMENT',
    payload: buttonId
  }
}
const resetActionCreator = () => {
  return {
    type: 'RESET'
    }
  }
const playPauseActionCreator = () => {
    return {
      type: 'PLAY_PAUSE'
    }
}
const decrementTimeActionCreator = () => {
  return {
    type: 'DECREMENT_TIME'
  }
}
const sessionOrBreakAcionCreator = () => {
  return {
    type: 'SESSION_OR_BREAK'
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    decrement : (buttonId) => {
      dispatch(decrementActionCreator(buttonId));
    },
    increment : (buttonId) => {
      dispatch(incrementActionCreator(buttonId));
    },
    reset : () => {
      dispatch(resetActionCreator())
    },
    playPause : () => {
      dispatch(playPauseActionCreator())
    },
    decrementTime : () => {
      dispatch(decrementTimeActionCreator())
    },
    sessionOrBreak : () => {
      dispatch(sessionOrBreakAcionCreator())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    breakLength: state.breakLength,
    sessionLength: state.sessionLength,
    minutesLeft: state.minutesLeft,
    secondesLeft: state.secondesLeft,
    onOff: state.onOff,
    currentTimer : state.currentTimer
  }
}
const el = document.querySelector("#root");
ReactDOM.render(<App />, el);
export default connect(mapStateToProps,mapDispatchToProps)(App);