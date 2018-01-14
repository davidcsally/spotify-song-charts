import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  isActive, text, action, stateAction, index,
}) => {
  if (isActive) {
    return (
      <button
        className="btn btn-lg button-active"
        onClick={() => {
          action();
          stateAction(index);
        }}
      >
        {text}
      </button>);
  }

  return (
    <button
      className=" btn btn-lg button"
      onClick={() => {
        action();
        stateAction(index);
      }}
    >
      {text}
    </button>);
};

Button.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  stateAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Button;
