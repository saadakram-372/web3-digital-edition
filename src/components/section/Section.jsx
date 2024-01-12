import React from "react";

import "./Section.css";

export const Section = (props) => {
  const { title, bodyComponent } = props;

  return (
    <div className="section-container">
      <div className="section-header">
        <span>{title}</span>
      </div>

      <div className="section-body">{bodyComponent}</div>
    </div>
  );
};
