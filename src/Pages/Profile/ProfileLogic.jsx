import { useEffect, useState } from "react";
import appRef, { auth } from "../../Firebase/Firebase";

const ProfileLogic = () => {
  const [aboutPopupDialogBox, setAboutPopupDialogBox] = useState(false);
  const [profileAboutData, setProfileAboutData] = useState({});
  const [difficultyLevelTotalQuestions, setDifficultyLevelTotalQuestions] =
    useState({
      easy: 0,
      medium: 0,
      hard: 0,
    });
  const [solvedQuestions, setSolvedQuestions] = useState({});
  const [allCertificateProfile, setAllCertificateProfile] = useState({});
  const [difficultyLevelSolvedQuestion, setDifficultyLevelSolvedQuestion] =
    useState({
      easy: 0,
      medium: 0,
      hard: 0,
    });
  const [vsModeHistory, setVsModeHistory] = useState({});
  const [contestHistory, setContestHistory] = useState({});

  useEffect(() => {
    let cleanUp = true;
    appRef
      .child(`users_info/${auth.currentUser.uid}/about`)
      .on("value", (snapshot) => {
        setProfileAboutData(snapshot.val());
      });

    appRef
      .child(`users_info/${auth.currentUser.uid}/all_certificate`)
      .on("value", (snapshot) => {
        setAllCertificateProfile(snapshot.val());
      });

    appRef
      .child(`users_info/${auth.currentUser.uid}/all_contest`)
      .on("value", (snapshot) => {
        setContestHistory(snapshot.val());
      });

    appRef
      .child(`users_info/${auth.currentUser.uid}/vs_mode_history`)
      .on("value", (snapshot) => {
        setVsModeHistory(snapshot.val());
      });

    if (Object.keys(solvedQuestions).length === 0) {
      let Easy = 0;
      let Medium = 0;
      let Hard = 0;
      appRef
        .child(`users_info/${auth.currentUser.uid}/solved_question`)
        .on("value", (snapshot) => {
          const snap = snapshot.val();
          if(cleanUp) {
            setSolvedQuestions(snap);
          }
          if (snap !== null) {
            Object.values(snap).map((value) => {
              if (
                value.difficulty_level === "Easy" &&
                value.status === "submited"
              ) {
                Easy++;
              } else if (
                value.difficulty_level === "Medium" &&
                value.status === "submited"
              ) {
                Medium++;
              } else if (
                value.difficulty_level === "Hard" &&
                value.status === "submited"
              ) {
                Hard++;
              }
            });
            if (cleanUp) {
              setDifficultyLevelSolvedQuestion({
                easy: Easy,
                medium: Medium,
                hard: Hard,
              });
            }
          }
        });
    }

    if (difficultyLevelTotalQuestions.easy === 0) {
      let Easy = 0;
      let Medium = 0;
      let Hard = 0;
      appRef
        .child("languages_questions")
        .orderByChild("difficulty_level")
        .on("value", (snapshot) => {
          const snap = snapshot.val();
          Object.values(snap).map((value) => {
            Object.values(value).map((val) => {
              if (val.difficulty_level === "Easy") {
                Easy++;
              } else if (val.difficulty_level === "Medium") {
                Medium++;
              } else if (val.difficulty_level === "Hard") {
                Hard++;
              }
            });
          });
          if (cleanUp) {
            setDifficultyLevelTotalQuestions({
              easy: Easy,
              medium: Medium,
              hard: Hard,
            });
          }
        });
    }
  }, []);

  const aboutPopupOpenHandler = () => {
    setAboutPopupDialogBox(true);
  };

  const handleAboutDialogBoxClose = () => {
    setAboutPopupDialogBox(false);
  };

  const aboutAgreeBtn = () => {
    appRef
      .child(`users_info/${auth.currentUser.uid}/about`)
      .set(profileAboutData, () => {
        setAboutPopupDialogBox(false);
      });
  };

  const aboutChangeHandler = (event) => {
    setProfileAboutData({
      ...profileAboutData,
      [event.target.name]: event.target.value,
    });
  };

  return {
    aboutPopupOpenHandler,
    handleAboutDialogBoxClose,
    aboutPopupDialogBox,
    aboutAgreeBtn,
    profileAboutData,
    aboutChangeHandler,
    difficultyLevelTotalQuestions,
    difficultyLevelSolvedQuestion,
    allCertificateProfile,
    solvedQuestions,
    contestHistory,
    vsModeHistory
  };
};

export default ProfileLogic;
