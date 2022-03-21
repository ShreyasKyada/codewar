import React from "react";
import "./Certificate_Step_2.css";
import { BsLaptop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Certificate_Step_2 = ({ certificate_name }) => {
  return (
    <div className="certificate-step2-container">
      <div className="step2-container-header">
        <p>
          Make sure you're in a quiet environment with a stable internet
          connection and limited distractions. Good luck!
        </p>
        <br />
        <div className="container-body">
          <h4>Skills Certification Test</h4>
          <div className="lp-icons">
            <BsLaptop className="lp-icon" />
          </div>
        </div>
        <br />
        <Button
          variant="contained"
          className="proceed-btn"
          component={Link}
          to={`/test-questions-list/certificate/${certificate_name}`}
        >
          Take Test
        </Button>
      </div>
    </div>
  );
};

export default Certificate_Step_2;
