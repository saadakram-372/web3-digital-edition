import React from "react";

import "./Checkbox.css";

export const CheckBox = (props) => {
  const { title, value, onChange, status } = props;

  return (
    <label className="checkbox-inline">
      <input
        checked={status}
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      {title}
    </label>
  );
};
