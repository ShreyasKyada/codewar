import React from "react";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import Checkbox from "@mui/material/Checkbox";
import "./Challenges.css";
import { FormControlLabel } from "@mui/material";
import ChallengesLogic from "./ChallengesLogic";
import { Link } from "react-router-dom";
import SubHeader from "../../Components/SubHeader/SubHeader";

const Challenges = () => {
  const { languageList, languageName } = ChallengesLogic();

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          Dashboard: {
            name: "Dashboard",
            link: "/dashboard",
          },
          languageName: {
            name: languageName,
            link: ""
          },
        }}
      />
      <div className="challenge-container">
        <div className="all-challenge-card-container">
          {Object.keys(languageList).map((id) => {
            return (
              <Link
                className="router-links"
                key={id}
                to={`/question-show/${languageName}/${id}`}
              >
                <QuestionCard data={languageList[id]} />
              </Link>
            );
          })}
        </div>

        <section className="check-box-container">
          <div className="sorting-container">
            <div className="status-container">
              <p className="status-lable">STATUS</p>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="Unsolved"
                  className="check-box"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="Solved"
                  className="check-box"
                />
              </div>
            </div>

            <div className="skill-container">
              <p className="skill-lable">SKILLS</p>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="C (Basic)"
                  className="check-box"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="C (Intermediate)"
                  className="check-box"
                />
              </div>
            </div>

            <div className="difficulty-container">
              <p className="difficulty-lable">DIFFICULTY</p>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="Easy"
                  className="check-box"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="Medium"
                  className="check-box"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="Hard"
                  className="check-box"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Challenges;
