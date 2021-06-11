import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Button from "./Components/Button.js";
import Controls from "./Components/Controls";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faPlay, faPause, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
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
      let sound = document.getElementById("beep");
      sound.play();
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
    } else {
      countDown = setInterval(this.decr, 1000);
      this.setTimerOncolor();
    }
  }
  reset() {
    this.props.reset();
    if (this.props.onOff) {
      this.startStop();
    }
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
                <div></div>
              
                 /* "play/pause" <FontAwesomeIcon icon={faPlay} />
                  <FontAwesomeIcon icon={faPause} /> */
              }
            />
            <Controls
              id="reset"
              timerControl={this.reset}
              controlName={"reset"}
              /*<FontAwesomeIcon
                icon={faUndoAlt}
                style={{ fontSize: "large" }}
              />*/
            />
          </div>
          <audio
            id="beep"
            src="https://actions.google.com/sounds/v1/human_voices/human_fart.ogg"
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