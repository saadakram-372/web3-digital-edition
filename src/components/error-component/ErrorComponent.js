import React from "react";

import "./ErrorComponent.css";

export const ErrorComponent = ({ message }) => {
  return (
    <div className="error-container">
      <span className="error-message">{message}</span>
    </div>
  );
};
