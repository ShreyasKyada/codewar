import React from "react";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import Checkbox from "@mui/material/Checkbox";
import "./Challenges.css";
import { FormControlLabel, Skeleton } from "@mui/material";
import ChallengesLogic from "./ChallengesLogic";
import SubHeader from "../../Components/SubHeader/SubHeader";

const Challenges = () => {
  const {
    languageList,
    languageName,
    playWithFrdBtn,
    solvedQuestions,
    checkboxOnChangeHandler,
    isSkeletonLoading,
  } = ChallengesLogic();

  document.title = `${languageName} questions | CodeWar`;

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
            isSkeletonLoading ? (
              <>
              <Skeleton
                animation="wave"
                variant="rectangular"
                style={{ margin: "1rem 0" }}
                height={140}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                style={{ margin: "1rem 0" }}
                height={140}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                style={{ margin: "1rem 0" }}
                height={140}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                style={{ margin: "1rem 0" }}
                height={140}
              />
              </>
            ) : (
              Object.keys(languageList).map((id) => {
                let questionStatus = "none";
                if (solvedQuestions) {
                  if (solvedQuestions[id]) {
                    questionStatus = solvedQuestions[id].status;
                  }
                }
                return (
                  <QuestionCard
                    key={id}
                    data={languageList[id]}
                    languageName={languageName}
                    id={id}
                    questionStatus={questionStatus}
                    playWithFrdBtn={() => playWithFrdBtn(id, languageName)}
                  />
                );
              })
            )
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
                  control={<Checkbox className="check-box" id="unsolved" />}
                  label="Unsolved"
                  className="check-box"
                  onChange={checkboxOnChangeHandler}
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" id="solved" />}
                  label="Solved"
                  name="solved"
                  className="check-box"
                  onChange={checkboxOnChangeHandler}
                />
              </div>
            </div>

            <div className="difficulty-container">
              <p className="difficulty-lable">DIFFICULTY</p>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" id="easy" />}
                  label="Easy"
                  className="check-box"
                  onChange={checkboxOnChangeHandler}
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" id="medium" />}
                  label="Medium"
                  className="check-box"
                  onChange={checkboxOnChangeHandler}
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox className="check-box" id="hard" />}
                  label="Hard"
                  className="check-box"
                  onChange={checkboxOnChangeHandler}
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
