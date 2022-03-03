import React, { useState } from "react";
import "./ContestCard.css";
import { Button, Collapse } from "@mui/material";
import { Link } from "react-router-dom";

const ContestCard = ({ data, id }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const toggleCollapseState = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <div className="contest-card-container">
      <div className="contest-card-sub-container">
        <div
          className="content-card-top-container"
          onClick={toggleCollapseState}
        >
          <p className="content-card-title">{data.contest_name}</p>
          <div className="contest-btn-container">
            <Button
              variant="contained"
              component={Link}
              to={`/Contest/${id}`}
              className="contest-btn"
            >
              Sign Up
            </Button>
          </div>
        </div>
        <Collapse in={isCollapse} timeout={700} unmountOnExit>
          <div className="contest-collapse-container">
            <div className="contest-subtitle">Description</div>
            <div className="contest-description">{data.description}</div>
          </div>
        </Collapse>
      </div>
      <br></br>
    </div>
  );
};

export default ContestCard;
