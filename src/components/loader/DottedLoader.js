import React from "react";

import "./DottedLoader.css";

export const DottedLoader = () => {
  return (
    <div className="wave-dotted-loader-container">
      <div className="dot-container">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
        <div className="dot dot4"></div>
      </div>
    </div>
  );
};
