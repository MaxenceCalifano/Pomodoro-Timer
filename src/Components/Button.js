import React from "react";

 const Button = (props) => {
    return(
      <button id={props.id} 
      onClick={() => props.modifyLength(props.id)}
      className="button">
        {props.operator}
      </button>
    );
  };
  export default Button;