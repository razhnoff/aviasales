import React from "react";
import PropTypes from "prop-types";
import { PRIMARY, PRIMARY_ACTIVE } from "../../constants";
import "./Button.css";

export const Button = ({ type, value, onClick }) => {
  const classNames = {
    [PRIMARY_ACTIVE]: "primary__active"
  };
  const className = `btn primary ${classNames[type]}`;

  return (
    <button onClick={onClick} className={className}>
      {value}
    </button>
  );
};

Button.defaultProps = {
  type: PRIMARY
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string
};
