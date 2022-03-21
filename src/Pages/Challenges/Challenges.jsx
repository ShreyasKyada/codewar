import React from "react";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import Checkbox from "@mui/material/Checkbox";
import "./Challenges.css";
import { FormControlLabel } from "@mui/material";
import ChallengesLogic from "./ChallengesLogic";
import SubHeader from "../../Components/SubHeader/SubHeader";

const Challenges = () => {
  const { languageList, languageName, playWithFrdBtn } = ChallengesLogic();

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
            link: "",
          },
        }}
      />
      <div className="challenge-container">
        <div className="all-challenge-card-container">
          {languageList ? (
            Object.keys(languageList)
              .map((id) => {
                return (
                  <QuestionCard
                    key={id}
                    data={languageList[id]}
                    languageName={languageName}
                    id={id}
                    playWithFrdBtn={() => playWithFrdBtn(id, languageName)}
                  />
                );
              })
              .reverse()
          ) : (
            <h5 className="error-msg">Ohh..Noo!! Nothing to show.</h5>
          )}
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
