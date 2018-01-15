import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  isActive, title, apiFunc, stateAction, index, route,
}) => {
  if (isActive) {
    return (
      <button
        className="btn btn-lg button-active"
        onClick={() => {
          apiFunc(route);
          stateAction(index);
        }}
      >
        {title}
      </button>);
  }

  return (
    <button
      className=" btn btn-lg button"
      onClick={() => {
        apiFunc(route);
        stateAction(index);
      }}
    >
      {title}
    </button>);
};

Button.propTypes = {
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  apiFunc: PropTypes.func.isRequired,
  stateAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
};

export default Button;
