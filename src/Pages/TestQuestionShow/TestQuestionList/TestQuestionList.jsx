// This component shows all questions of test...

import { Button } from "@mui/material";
import React from "react";
import "./TestQuestionList.css";

const TestQuestionList = () => {
  const TestQuestionCard = () => {
    return (
      <div className="test-question-container">
        <div className="test-question-heading">
          <span className="test-question-no">1.</span>Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Et accusantium dignissimos ea
          corporis adipisci maiores.
        </div>
        <div className="test-btn-container">
          <Button variant="outlined" className="test-btn-list-show">
            Solve
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="test-questions-list-container">
      {TestQuestionCard()}
      {TestQuestionCard()}
      {TestQuestionCard()}
    </div>
  );
};

export default TestQuestionList;
