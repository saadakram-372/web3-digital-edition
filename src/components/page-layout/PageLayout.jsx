import React from "react";
import { NavLink } from "react-router-dom";

import { styled } from "styled-components";
import "./PageLayout.css";

export const PageLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <PageLayoutHeader />
      <StyledFixedContentDiv>
        <div className="body d-flex flex-no-wrap justify-content-between align-items-center container-fluid ">
          {children}
        </div>
      </StyledFixedContentDiv>
      <PageLayoutFooter />
    </div>
  );
};

const PageLayoutHeader = () => {
  return (
    <div className="navbar navbar-default navbar-fixed-top navbar-inverse">
      <span>TAYLOR EDITIONS</span>

      <div className="nav-list">
        {/* <NavLink to="/upload" className="active-link">
          Upload
        </NavLink> */}
        <NavLink to="/edition" className="active-link">
          Edition
        </NavLink>
      </div>
    </div>
  );
};

const PageLayoutFooter = () => {
  return (
    <div className="footer">
      <div>
        <span>
          Copyright © 2018{" "}
          <a href="https://www.ox.ac.uk/">University of Oxford</a> &nbsp; ·
          &nbsp; Taylor Editions is licensed under{" "}
          <a
            rel="license"
            href="https://creativecommons.org/licenses/by-sa/4.0/">
            <img
              alt="CC BY-NC-SA 4.0"
              style={{ borderWidth: 0 }}
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
            />
          </a>{" "}
          &nbsp; · &nbsp; Website by &nbsp;
          <a href="https://www.hubers.org.uk/">
            <img
              style={{
                height: "14px",
                marginBottom: "2px",
                verticalAlign: "text-bottom",
              }}
              title="Huber Digital"
              alt="Huber Digital"
              src="https://huberdigital.files.wordpress.com/2019/09/cropped-hd-logo.png"
            />
          </a>
        </span>
      </div>
    </div>
  );
};

const StyledFixedContentDiv = styled.div`
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 9;

  .action-area {
    .btn {
      white-space: nowrap;
    }
  }
`;
