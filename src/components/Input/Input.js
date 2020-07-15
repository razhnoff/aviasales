import React from "react";
import PropTypes from "prop-types";
import { CHECKBOX } from "../../constants";
import "./Input.css";

export const Input = ({ type, value, checked, onChange }) => {
  return (
    <label className={"container"}>
      <input type={type} checked={checked} onChange={onChange} />
      <span className={"checkmark"}></span>
      <span className={"checkmark__label"}>{value}</span>
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: CHECKBOX,
};
