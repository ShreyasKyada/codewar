import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import "./UserProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import appRef, { auth } from "../../Firebase/Firebase";
import { Button, CircularProgress, Skeleton } from "@mui/material";
import { loginContext } from "../../Context/LoginContext";

const UserProfile = () => {
  const { id, languageName, qid } = useParams();
  const [vsModeQuestionData, setVsModeQuestionData] = useState({});
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [randomNumber, setRandomNumber] = useState(Number);
  const [usersInfo, setUsersInfo] = useState({});
  const [vsModeUid, setVsModeUid] = useState([]);
  const [isRedirectingState, setIsRedirectingState] = useState(false);
  const { setSnackbarData } = useContext(loginContext);
  const navigate = useNavigate();

  document.title = `Vs mode | CodeWar`;

  useEffect(() => {
    let cleanUp = true;

    if (randomNumber && !qid && cleanUp) {
      appRef
        .child("/vs_mode")
        .orderByChild("creater_email")
        .equalTo(auth.currentUser.email)
        .on("value", (snapshot) => {
          const snap = snapshot.val();

          if (snap === null && cleanUp) {
            appRef.child(`/vs_mode/${auth.currentUser.uid}`).set({
              random_number: randomNumber,
              creater_email: auth.currentUser.email,
              creater_name: auth.currentUser.displayName,
              creater_win_status: "",
              path: `/languages_questions/${languageName}/${id}`,
              languageName: languageName,
              opponent_uid: "",
              opponent_name: "",
              opponent_email: "",
              opponent_win_status: "",
            });
            cleanUp = false;
          } else {
            if (cleanUp) {
              let tempObj = Object.values(snap);
              setVsModeUid(Object.keys(snap));
              appRef.child(`/vs_mode/${auth.currentUser.uid}`).set({
                ...tempObj[0],
                random_number: randomNumber,
                creater_email: auth.currentUser.email,
                creater_name: auth.currentUser.displayName,
                creater_win_status: "",
                path: `/languages_questions/${languageName}/${id}`,
                languageName: languageName,
                opponent_name: "",
                opponent_email: "",
                opponent_uid: "",
                opponent_win_status: "",
              });
              cleanUp = false;
            }
          }
        });
    }

    return () => {
      cleanUp = false;
    };
  }, [randomNumber]);

  useEffect(() => {
    if (isRedirectingState) {
      let redirectId = vsModeUid[0];
      setTimeout(() => {
        if (usersInfo && redirectId) {
          if (usersInfo.opponent_email || usersInfo.creater_email) {
            if (qid) navigate(`/test-questions-list/vsmode/${redirectId}/join`);
            else navigate(`/test-questions-list/vsmode/${redirectId}`);
          }
        }
      }, 2500);
    }

    return () => {
      if (isRedirectingState === false && !id) {
        appRef.child(`/vs_mode/${auth.currentUser.uid}`).remove();
      }
    };
  }, [isRedirectingState]);

  // useEffect(() => {
  //   let cleanUp = true;
  //   if (isLeaderNotActiveState) {
  //     if (cleanUp)
  //       setSnackbarData("Ohh..noo, Can't connect to your friend", "error");
  //     navigate("/vsmode");
  //   }
  //   return () => {
  //     cleanUp = false;
  //   };
  // }, [isLeaderNotActiveState]);

  useEffect(() => {
    let cleanUp = true;
    if (qid && vsModeUid[0] && isSkeletonLoading) {
      appRef.child(`/vs_mode/${vsModeUid[0]}`).set({
        ...usersInfo,
        opponent_name: auth.currentUser.displayName,
        opponent_email: auth.currentUser.email,
        opponent_uid: auth.currentUser.uid,
      });
      if (cleanUp) setIsSkeletonLoading(false);
    }

    return () => {
      if (qid && vsModeUid[0] && !isSkeletonLoading && !isRedirectingState) {
        appRef.child(`/vs_mode/${vsModeUid[0]}`).set({
          ...usersInfo,
          opponent_name: "",
          opponent_email: "",
          opponent_uid: "",
        });
        setSnackbarData("You are exit unexpectedly..!!", "error");
        navigate("/vsmode");
      }
      cleanUp = false;
    };
  }, [usersInfo]);

  useEffect(() => {
    let cleanUp = true;
    if (id && usersInfo) {
      if (usersInfo.opponent_email && cleanUp) {
        setIsSkeletonLoading(false);
        setIsRedirectingState(true);
      }

      // if (!usersInfo.opponent_email && !isSkeletonLoading && cleanUp) {
      //   setIsSkeletonLoading(true);
      //   setIsRedirectingState(false);
      //   setSnackbarData("Your opponent is disconnected.", "error");
      // }
    }

    return () => {
      cleanUp = false;
    };
  }, [usersInfo]);

  useEffect(() => {
    let cleanUp = true;

    if (id) {
      let randNum = Math.random().toString().substring(2, 6);
      setRandomNumber(randNum);
    }

    if (id) {
      appRef
        .child(`/vs_mode/${auth.currentUser.uid}`)
        .on("value", (snapshot) => {
          if (cleanUp) setUsersInfo(snapshot.val());
        });
      appRef
        .child(`/languages_questions/${languageName}/${id}`)
        .on("value", (snapshot) => {
          if (cleanUp) setVsModeQuestionData(snapshot.val());
        });
    } else if (qid) {
      appRef
        .child(`/vs_mode`)
        .orderByChild("random_number")
        .equalTo(qid)
        .on("value", (snapshot) => {
          const snap = snapshot.val();
          // if (snap === null) {
          //   if (cleanUp) setIsLeaderNotActiveState(true);
          // } else {
          const tempObj = Object.values(snap);
          if (cleanUp) {
            setUsersInfo(tempObj[0]);
            setIsRedirectingState(true);
            setVsModeUid(Object.keys(snap));
          }
          if (cleanUp) {
            appRef.child(tempObj[0].path).on("value", (innerSnapshot) => {
              const innerSnap = innerSnapshot.val();
              if (cleanUp) setVsModeQuestionData(innerSnap);
            });
          }
          // }
        });
    } else {
      setSnackbarData("ERRORROR");
    }

    return () => {
      cleanUp = false;
    };
  }, [id, qid]);

  return (
    <div className="userprofile-parent-container">
      {!qid ? (
        <p className="qid-heading">Question id: {randomNumber}</p>
      ) : (
        <p style={{ color: "var(--text-color)", textAlign: "center" }}></p>
      )}
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
                <h4>{vsModeQuestionData.question_heading}</h4>
                <p className="other-text-details">
                  Language: {qid ? usersInfo.languageName : languageName}
                </p>
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
                  <p style={{ marginLeft: "0.5rem" }}>
                    {id ? usersInfo.opponent_name : usersInfo.creater_name}
                  </p>
                </div>
                <div className="card">
                  <Card className="question-card">
                    <h4>{vsModeQuestionData.question_heading}</h4>
                    <p className="other-text-details">
                      Language: {qid ? usersInfo.languageName : languageName}
                    </p>
                    <p className="other-text-details">
                      Difficulty level: {vsModeQuestionData.difficulty_level}
                    </p>
                    <p className="other-text-details">
                      Require skill: {vsModeQuestionData.require_skill}
                    </p>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isRedirectingState ? (
        <div className="progress-bar-container">
          <CircularProgress
            className="circular-progress-bar"
            style={{ fontSize: "0.68rem !important" }}
          />{" "}
          Preparing for environment...
        </div>
      ) : (
        <Button variant="contained" className="userprofile-btn">
          Cancel
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
