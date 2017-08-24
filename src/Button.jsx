import React, { Component } from 'react';

class Button extends Component {
  render() {
    if (this.props.isActive) {
      return (
        <div className="btn btn-lg button-active"
        onClick={() => {
          this.props.action()
          this.props.stateAction(this.props.index)
        }}
        >
          {this.props.text}
        </div>
      )    
    }

    else {
      return (
        <div className="btn btn-lg button"
        onClick={() => {
          this.props.action()
          this.props.stateAction(this.props.index)
        }}
        >
          {this.props.text}
        </div>
      )    
    }
  }
};

export default Button;
