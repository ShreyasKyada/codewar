import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SubHeader.css";

const SubHeader = ({ subHeaderNevigationLink }) => {
  const [lastSubHeaderLink, setLastSubHeaderLink] = useState("");

  const subHeaderLinkGeneratore = () => {
    let counter = 1;
    const subHeaderArray = Object.keys(subHeaderNevigationLink).map((key) => {
      if (counter === 1 && Object.keys(subHeaderNevigationLink).length === 1) {
        if (lastSubHeaderLink === "") {
          setLastSubHeaderLink(subHeaderNevigationLink[key].name);
        }
        return (
          <p
            className="router-links sub-header-links last-subheader-links"
            key={key}
          >
            {subHeaderNevigationLink[key].name}
          </p>
        );
      } else if (counter !== Object.keys(subHeaderNevigationLink).length) {
        counter++;
        return (
          <div key={key} className="subheader-p-tag">
            <Link
              to={`${subHeaderNevigationLink[key].link}`}
              className="router-links sub-header-links"
            >
              {subHeaderNevigationLink[key].name}
            </Link>
            <p className="next-indicatore">{">"}</p>
          </div>
        );
      } else {
        counter++;
        if (lastSubHeaderLink === "") {
          setLastSubHeaderLink(subHeaderNevigationLink[key].name);
        }
        return (
          <p
            key={key}
            className="router-links sub-header-links last-subheader-links"
          >
            {subHeaderNevigationLink[key].name}
          </p>
        );
      }
    });
    return subHeaderArray;
  };

  return (
    <div className="sub-header">
    <div className="sub-header-top-container">
      {subHeaderLinkGeneratore()}
    </div>
      <p className="subheader-heading">{lastSubHeaderLink}</p>
    </div>
  );
};

export default SubHeader;
