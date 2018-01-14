import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  isActive, text, action, stateAction, index, route,
}) => {
  if (isActive) {
    return (
      <button
        className="btn btn-lg button-active"
        onClick={() => {
          action(route);
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
        action(route);
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
  route: PropTypes.string.isRequired,
};

export default Button;
