import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef, { auth } from "../../Firebase/Firebase";
import { loginContext } from "../../Context/LoginContext";
import { themeContext } from "../../Context/ThemeContext";
import { getCodeEditorLanguageMode } from "../../Helper/CodeEditorThemes";

const TestQuestionShowLogic = () => {
  const [testQuestionData, setTestQuestionData] = useState({});
  const { type, name, join } = useParams();
  const { setIsShowNavbar, setSnackbarData } = useContext(loginContext);
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);
  const [isShowTestNavbar, setIsShowTestNavbar] = useState(true);
  const [value, setValue] = useState("1");
  const [activeLanguage, setActiveLanguage] = useState({
    name: "",
    compiler_name: "",
    index: "",
  });
  const [editorMode, setEditorMode] = useState("");
  const [submitedQuestions, setSubmitedQuestions] = useState([]);
  const [isOpenDialogBox, setIsOpenDialogBox] = useState(false);
  const navigate = useNavigate();
  const [allLanguagesName, setAllLanguagesName] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  let languageName = name.split("(")[0].trim();

  useEffect(() => {
    let cleanup = true;
    // Set Editor theme
    if (type === "contest") {
      setAllLanguagesName([
        "C",
        "C++",
        "Java",
        "Php",
        "Javascript",
        "Perl",
        "Python",
        "Ruby",
        "C#",
        "Swift",
      ]);
      setActiveLanguage("C");
      setEditorMode(getCodeEditorLanguageMode("C"));
      if (cleanup) {
        appRef.child(`${type}_questions/${name}`).on("value", (snapshot) => {
          if (cleanup) setTestQuestionData(snapshot.val());
        });
      }
    } else if (type === "certificate") {
      setActiveLanguage(languageName);
      setEditorMode(getCodeEditorLanguageMode(languageName));
      if (cleanup) {
        appRef.child(`${type}_questions/${name}`).on("value", (snapshot) => {
          if (cleanup) setTestQuestionData(snapshot.val());
        });
      }
    } else if (type === "vsmode") {
      appRef.child(`/vs_mode/${name}`).on("value", (snapshot) => {
        const snap = snapshot.val();
        if (snap !== null) {
          if (cleanup) {
            setAllLanguagesName([snap.languageName]);
            setActiveLanguage(snap.languageName);
            setEditorMode(getCodeEditorLanguageMode(snap.languageName));
            setUserInfo(snap);
            appRef.child(snap.path).on("value", (innerSnapshot) => {
              let innerSnap = innerSnapshot.val();
              const tempObjValue = innerSnap;
              let tempObj = {
                tempObjValue,
              };
              if (cleanup) {
                setTestQuestionData(tempObj);
                setValue("3");
              }
            });
          }
        }
      });
    }

    return () => {
      cleanup = false;
    };
  }, []);

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) setIsShowNavbar(false);
    return () => {
      cleanUp = false;
    };
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === "0") {
      return;
    }
    if (newValue !== "0") setValue(newValue);
    if (newValue >= "3") {
      setIsShowTestNavbar(false);
    } else {
      setIsShowTestNavbar(true);
    }
  };

  const listTabNavigation = (val) => {
    setValue(`${val}`);
    if (val >= "3") {
      setIsShowTestNavbar(false);
    } else {
      setIsShowTestNavbar(true);
    }
  };

  const toggleDarkMode = () => {
    if (isDarkMode) setIsDarkMode(false);
    else setIsDarkMode(true);
  };

  const finalTestSubmissionHandler = () => {
    setIsOpenDialogBox(true);
  };

  const handleDialogBoxClose = () => {
    setIsOpenDialogBox(false);
  };

  const getActiveLang = (e) => {
    languageName = e.value;
    setActiveLanguage(e.value);
    setEditorMode(getCodeEditorLanguageMode(e.value));
  };

  useEffect(() => {
    if (userInfo) {
      if (join) {
        if (userInfo.opponent_win_status === "win") {
          navigate(`/vsmode/result/join/${name}/win`);
        }
        if (userInfo.opponent_win_status === "loss") {
          navigate(`/vsmode/result/join/${name}/loss`);
        }
      } else {
        if (userInfo.creater_win_status === "win") {
          navigate(`/vsmode/result/creater/${name}/win`);
        }
        if (userInfo.creater_win_status === "loss") {
          navigate(`/vsmode/result/creater/${name}/loss`);
        }
      }
    }
  }, [userInfo]);

  const agreeBtnClick = async () => {
    setIsOpenDialogBox(false);

    if (type === "certificate") {
      // Checking the result of certificate
      if (Object.keys(testQuestionData).length === submitedQuestions.length) {
        //You passed
        await appRef
          .child(`/users_info/${auth.currentUser.uid}/all_certificate`)
          .push(name);

        const resultDetails = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            certificate_name: name,
            result: "pass",
          }),
        };

        fetch("/sendCertificateResult", resultDetails);
      } else {
        const resultDetails = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            certificate_name: name,
            result: "pass",
          }),
        };

        fetch("/sendCertificateResult", resultDetails);
      }

      navigate("/certificate-result-msg/" + name);
    } else if (type === "contest") {
      if (Object.keys(testQuestionData).length === submitedQuestions.length) {
        await appRef
          .child(`/users_info/${auth.currentUser.uid}/contest_history`)
          .push({ name: name, status: "passed" });

        setSnackbarData("Congratulations..You are passed..!!", "succsess");
      } else {
        setSnackbarData("Oops..You are failed..!!", "error");
        await appRef
          .child(`/users_info/${auth.currentUser.uid}/all_contest`)
          .push({ name: name, status: "failed" });
      }
      navigate("/contest");
    }
  };

  return {
    testQuestionData,
    isShowTestNavbar,
    value,
    handleChange,
    toggleDarkMode,
    isDarkMode,
    listTabNavigation,
    activeLanguage,
    editorMode,
    languageName,
    submitedQuestions,
    setSubmitedQuestions,
    isOpenDialogBox,
    handleDialogBoxClose,
    agreeBtnClick,
    finalTestSubmissionHandler,
    allLanguagesName,
    getActiveLang,
    type,
    name,
    userInfo,
    join,
  };
};

export default TestQuestionShowLogic;
