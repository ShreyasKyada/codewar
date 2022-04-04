import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./QuestionCard.css";

const QuestionCard = ({
  data,
  languageName,
  id,
  questionStatus,
  playWithFrdBtn,
}) => {
  return (
    <>
      <div className="challenge-card-container">
        <section className="card-left-container">
          <p className="challenge-card-heading">{data.question_heading}</p>
          <div className="challenge-card-other">
            {data.difficulty_level === "Easy" && (
              <p style={{ color: "#1ba94c", display: "inline-block" }}>
                {data.difficulty_level},
              </p>
            )}
            {data.difficulty_level === "Medium" && (
              <p style={{ color: "#db7100", display: "inline-block" }}>
                {data.difficulty_level},
              </p>
            )}
            {data.difficulty_level === "Hard" && (
              <p style={{ color: "#d11534", display: "inline-block" }}>
                {data.difficulty_level},
              </p>
            )}
            {"   "}
            {data.require_skill}
            {", Max score: "}
            {data.max_score}
          </div>
        </section>
        <section className="card-right-container">
          <Button
            variant="outlined"
            className="btn-play"
            color="primary"
            onClick={playWithFrdBtn}
          >
            Play With Friend
          </Button>
          {questionStatus === "submited" ? (
            <Button
              variant="contained"
              className="button-problem"
              color="primary"
              component={Link}
              to={`/question-show/${languageName}/${id}`}
            >
              Submited
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="button-problem"
              color="primary"
              component={Link}
              to={`/question-show/${languageName}/${id}`}
            >
              {questionStatus === "run" && questionStatus !== "none"
                ? "Try Again"
                : "Solve Problem"}
            </Button>
          )}
        </section>
      </div>
    </>
  );
};

export default QuestionCard;
