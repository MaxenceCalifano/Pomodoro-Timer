import React from "react";


export default class Controls extends React.Component {
  state = {
    isMoving: false
  };
  render() {
    return (
      <button onMouseEnter={ () => this.setState({isMoving:!this.state.isMoving}) } onMouseLeave={ () => this.setState({isMoving:!this.state.isMoving})} id={this.props.id} 
      onClick={this.props.timerControl}
      className= "controls"/* {this.state.isMoving ? 
        this.props.id =="start_stop" ? controls_start_stop" : "" 
        : ""} */
      >
        {this.props.controlName}
      </button>
    );
  };
};