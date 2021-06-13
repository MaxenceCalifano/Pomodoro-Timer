import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  minutesLeft: 25,
  secondesLeft: 0,
  onOff: false,
  currentTimer: "Session"
}

const pomodoroReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DECREMENT':
      if(action.payload === "break-decrement")
        {
          if (state.breakLength > 1) {
            return {
              ...state,
              breakLength: state.breakLength - 1
            }
          } else return state;
        } else {
          if (state.sessionLength > 1) {
            return {
              ...state,
              sessionLength: state.sessionLength - 1,
              minutesLeft: state.minutesLeft - 1
            }
          } else return state;
        }
      break;
    case 'INCREMENT':
    if(action.payload ==="break-increment") {
      if (state.breakLength < 60) {
        return {
          ...state,
          breakLength: state.breakLength + 1
        }
      } else return state;
    } else {
      if (state.sessionLength < 60) {
        return {
          ...state,
          sessionLength: state.sessionLength + 1,
          minutesLeft: state.minutesLeft + 1
        }
      } else return state;
    }    
      break;
    case 'RESET':
      return {
        ...initialState
      }
      break;
    case 'PLAY_PAUSE':
      if (state.onOff) {
        return {
          ...state,
          onOff: false
        }
      } else {
        return {
          ...state,
          onOff: true
        }
      }
      break;
    case 'DECREMENT_TIME':
      if (state.secondesLeft === 0) {
        return {
          ...state,
          minutesLeft: state.minutesLeft - 1,
          secondesLeft: 59
        }
      } else {
        return {
          ...state,
          secondesLeft: state.secondesLeft - 1
        }
      }
    case 'SESSION_OR_BREAK':
      if (state.currentTimer === "Session") {
        return {
          ...state,
          minutesLeft: state.breakLength,
          currentTimer: "break"
        }
      } else {
        return {
          ...state,
          minutesLeft: state.sessionLength,
          currentTimer: "Session"
        }
      }
    default: return state;
      break;
  }
}

const store = createStore(pomodoroReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
