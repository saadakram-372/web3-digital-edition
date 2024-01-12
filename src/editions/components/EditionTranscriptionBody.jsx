import React from "react";

import "./EditionTranscriptionBody.css";

export const EditionTranscriptionBody = (props) => {
  const { content } = props;

  //   console.log("content: ", content);

  return (
    <div className="edition-body-container">
      {/* Edition Div1 Header */}
      <EditionDiv1Header content={content.div1.header.transcription} />

      {/* Edition Div2 Header */}
      <span className="div2-header">{content.div2.header.transcription}</span>
      <div className="line" />

      {content.div2.body.transcription.map((content) => {
        return (
          <>
            <span>{content}</span>
            <div className="line" />
          </>
        );
      })}
    </div>
  );
};

const EditionDiv1Header = ({ content }) => (
  <div className="div1-header">
    <div className="line" />
    <span>{content}</span>
    <div className="line" />
  </div>
);
