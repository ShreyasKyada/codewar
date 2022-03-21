// This component shows all questions of test...

import { Button } from "@mui/material";
import React from "react";
import "./TestQuestionList.css";

const TestQuestionList = ({ testQuestionData, listTabNavigation,submitedQuestions }) => {
  let number = 1;

  const TestQuestionCard = (data, number, id) => {
    return (
      <div className="test-question-container" key={number}>
        <div className="test-question-heading">
          <span className="test-question-no">{number}.</span>
          {data.question_heading}
        </div>
        <div className="test-btn-container">
        {
          submitedQuestions.indexOf(id) === -1 ? 
          <Button
            variant="outlined"
            className="test-btn-list-show"
            onClick={() => listTabNavigation(number + 2)}
          >
            Solve
          </Button> :
          <Button
            variant="contained"
            className="test-btn-list-show"
            onClick={() => listTabNavigation(number + 2)}
          >
            Solved
          </Button>
        }
        </div>
      </div>
    );
  };

  return (
    <div className="test-questions-list-container">
      {testQuestionData ? Object.keys(testQuestionData).map((id) => {
        return TestQuestionCard(testQuestionData[id], number++, id);
      }) : "Oh noo..!! Nothing to show :("}
    </div>
  );
};

export default TestQuestionList;
