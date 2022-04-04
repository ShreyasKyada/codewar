import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loginContext } from "../../Context/LoginContext";
import appRef, { auth } from "../../Firebase/Firebase";

const ChallengesLogic = () => {
  const { languageName } = useParams();
  const [languageList, setLanguageList] = useState({});
  const [solvedQuestions, setSolvedQuestions] = useState({});
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const { setIsLoadingState } = useContext(loginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (languageList) {
      setIsLoadingState(true);
      appRef
        .child(`users_info/${auth.currentUser.uid}/solved_question`)
        .on("value", (snapshot) => {
          setSolvedQuestions(snapshot.val());
          appRef
            .child(`/languages_questions/${languageName}`)
            .on("value", (snapshot) => {
              setLanguageList(snapshot.val());
              setIsLoadingState(false);
              setIsSkeletonLoading(false);
            });
        });
    }
  }, []);

  const playWithFrdBtn = (id) => {
    navigate(`/user-profiles/${languageName}/${id}`);
  };

  const checkboxOnChangeHandler = async () => {
    setIsSkeletonLoading(true);
    const unsolved = document.getElementById("unsolved").checked;
    const solved = document.getElementById("solved").checked;
    const easy = document.getElementById("easy").checked;
    const medium = document.getElementById("medium").checked;
    const hard = document.getElementById("hard").checked;

    let tempArr = {};

    if (unsolved && !easy && !medium && !hard) {
      await appRef
        .child(`/languages_questions/${languageName}`)
        .get()
        .then((snapshot) => {
          const snap = snapshot.val();
          Object.keys(snap).forEach((id) => {
            if (!solvedQuestions[id]) {
              tempArr = { ...tempArr, [id]: snap[id] };
            }
          });
        });
    }

    if (solved && !easy && !medium && !hard) {
      await appRef
        .child(`/languages_questions/${languageName}`)
        .get()
        .then((snapshot) => {
          const snap = snapshot.val();
          Object.keys(snap).forEach((id) => {
            if (solvedQuestions[id]) {
              tempArr = { ...tempArr, [id]: snap[id] };
            }
          });
        });
    }

    if (easy) {
      await appRef
        .child(`/languages_questions/${languageName}`)
        .orderByChild("difficulty_level")
        .equalTo("Easy")
        .get()
        .then((snapshot) => {
          const snap = snapshot.val();
          if (unsolved) {
            Object.keys(snap).forEach((id) => {
              if (!solvedQuestions[id]) {
                tempArr = { ...tempArr, [id]: snap[id] };
              }
            });
          }
          if (solved) {
            Object.keys(snap).forEach((id) => {
              if (solvedQuestions[id]) {
                tempArr = { ...tempArr, [id]: snap[id] };
              }
            });
          }
          if (!unsolved && !solved) {
            Object.keys(snap).forEach((id) => {
              tempArr = { ...tempArr, [id]: snap[id] };
            });
          }
        });
    }

    if (medium) {
      await appRef
        .child(`/languages_questions/${languageName}`)
        .orderByChild("difficulty_level")
        .equalTo("Medium")
        .get()
        .then((snapshot) => {
          const snap = snapshot.val();
          if (unsolved) {
            Object.keys(snap).forEach((id) => {
              if (!solvedQuestions[id]) {
                tempArr = { ...tempArr, [id]: snap[id] };
              }
            });
          }
          if (solved) {
            Object.keys(snap).forEach((id) => {
              if (solvedQuestions[id]) {
                tempArr = { ...tempArr, [id]: snap[id] };
              }
            });
          }
          if (!unsolved && !solved) {
            Object.keys(snap).forEach((id) => {
              tempArr = { ...tempArr, [id]: snap[id] };
            });
          }
        });
    }

    if (hard) {
      await appRef
        .child(`/languages_questions/${languageName}`)
        .orderByChild("difficulty_level")
        .equalTo("Hard")
        .get()
        .then((snapshot) => {
          const snap = snapshot.val();
          if (unsolved) {
            Object.keys(snap).forEach((id) => {
              if (!solvedQuestions[id]) {
                tempArr = { ...tempArr, [id]: snap[id] };
              }
            });
          }
          if (solved) {
            Object.keys(snap).forEach((id) => {
              if (solvedQuestions[id]) {
                tempArr = { ...tempArr, [id]: snap[id] };
              }
            });
          }
          if (!unsolved && !solved) {
            Object.keys(snap).forEach((id) => {
              tempArr = { ...tempArr, [id]: snap[id] };
            });
          }
        });
    }

    if (!unsolved && !solved && !easy && !medium && !hard) {
      await appRef
        .child(`/languages_questions/${languageName}`)
        .get()
        .then((snapshot) => {
          tempArr = snapshot.val();
        });
    }

    if (Object.keys(tempArr).length === 0) setLanguageList(null);
    else setLanguageList(tempArr);
    setIsSkeletonLoading(false);
  };

  return {
    languageList,
    languageName,
    playWithFrdBtn,
    solvedQuestions,
    checkboxOnChangeHandler,
    isSkeletonLoading,
  };
};

export default ChallengesLogic;
