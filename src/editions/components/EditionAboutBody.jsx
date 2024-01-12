import React from "react";

import "./EditionAboutBody.css";

export const EditionAboutBody = (props) => {
  const { content } = props;

  return (
    <div className="about-container">
      <div className="section">
        <span className="heading">About this text</span>
        {aboutTextSection("Title", content.editionTitle)}
        {aboutTextSection("Edition", content.editionHeader)}
        {aboutTextSection("Series", content.seriesStatement)}{" "}
        {aboutTextSection("Author", `${content.author.join(" ")} `)}
        {aboutTextSection(
          "Editor",
          `Encoded by: ${content.encodedBy} Transcribed by: ${content.transcribedBy}`
        )}
      </div>
    </div>
  );
};

const aboutTextSection = (heading, text) => {
  return (
    <span>
      {`${heading}: `}
      <span className="about-text">{text}</span>
    </span>
  );
};
