import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import appRef, { auth } from "../../Firebase/Firebase";
import { Button, Skeleton } from "@mui/material";

const UserProfile = () => {
  const { id, languageName } = useParams();
  const [vsModeQuestionData, setVsModeQuestionData] = useState({});
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);

  useEffect(async () => {
    let randomNumber = Math.floor(Math.random(0, 100) * 10000);

    const isNumberAvailable = await appRef
      .child(`/vs_mode`)
      .equalTo(`123456`)
      .on("value", (snap) => {
        console.log(snap.val());
        return snap.val();
      });

    console.log(isNumberAvailable);

    appRef
      .child(`/languages_questions/${languageName}/${id}`)
      .on("value", (snapshot) => {
        setVsModeQuestionData(snapshot.val());
      });
  }, [id]);

  return (
    <div className="userprofile-parent-container">
      <p className="qid-heading">Question id: 1234</p>
      <div className="userprofile-container">
        <div className="userprofile-sub-container">
          <div className="userprofile-sub-left">
            <div className="containt">
              <AccountCircleIcon className="profile-icon" />
              <p style={{ marginLeft: "0.5rem" }}>
                {auth.currentUser.displayName}
              </p>
            </div>
            <div className="card">
              <Card className="question-card">
                <h3>{vsModeQuestionData.question_heading}</h3>
                <p className="other-text-details">Language: {languageName}</p>
                <p className="other-text-details">
                  Difficulty level: {vsModeQuestionData.difficulty_level}
                </p>
                <p className="other-text-details">
                  Require skill: {vsModeQuestionData.require_skill}
                </p>
              </Card>
            </div>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            style={{ textShadow: "2px 2px 8px black" }}
          >
            VS
          </Divider>

          <div className="userprofile-sub-right">
            {isSkeletonLoading ? (
              <>
                <div className="containt" style={{ padding: "0.5rem 0" }}>
                  <Skeleton
                    variant="circular"
                    height={40}
                    width={40}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    style={{ marginLeft: "0.5rem", width: "80%" }}
                    height={40}
                    animation="wave"
                  />
                </div>
                <div className="card">
                  <Skeleton
                    variant="rectangular"
                    height={40}
                    animation="wave"
                    className="question-card-skeleton"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="containt">
                  <AccountCircleIcon className="profile-icon" />
                  <p style={{ marginLeft: "0.5rem" }}>User Name</p>
                </div>
                <div className="card">
                  <Card className="question-card"></Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Button variant="contained" className="userprofile-btn">
        Cancel
      </Button>
    </div>
  );
};

export default UserProfile;
