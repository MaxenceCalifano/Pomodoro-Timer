import React from "react";

const Controls = (props) => {
    return (
      <button id={props.id} 
      onClick={props.timerControl}
      className="controls">
        {props.controlName}
      </button>
    );
  };
  export default Controls;