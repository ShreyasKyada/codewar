import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef, { auth } from "../../Firebase/Firebase";
import { loginContext } from "../../Context/LoginContext";
import { themeContext } from "../../Context/ThemeContext";
import { getCodeEditorLanguageMode } from "../../Helper/CodeEditorThemes";

const TestQuestionShowLogic = () => {
  const [testQuestionData, setTestQuestionData] = useState({});
  const { type, name } = useParams();
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
  let languageName = name.split("(")[0].trim();

  useEffect(() => {
    let cleanup = true;
    // Set Editor theme
    if (type === "contest") {
      setAllLanguagesName(["C", "C++", "java"]);
      setActiveLanguage("C");
      setEditorMode(getCodeEditorLanguageMode("C"));
    } else {
      setActiveLanguage(languageName);
      setEditorMode(getCodeEditorLanguageMode(languageName));
    }

    if (cleanup) {
      appRef.child(`${type}_questions/${name}`).on("value", (snapshot) => {
        setTestQuestionData(snapshot.val());
      });
    }

    return () => (cleanup = false);
  }, []);

  useEffect(() => {
    setIsShowNavbar(false);
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

  const agreeBtnClick = async () => {
    setIsOpenDialogBox(false);

    if (type === "certificate") {
      // Checking the result of certificate
      if (Object.keys(testQuestionData).length === submitedQuestions.length) {
        //You passed
        await appRef
          .child(`/users_info/${auth.currentUser.uid}/all_certificate`)
          .push(name);
        // send one certificate mail
      } else {
        // you failed
        // send one failed msg mail
      }
      navigate("/certificate-result-msg/" + name);
    } else if (type === "contest") {
      if (Object.keys(testQuestionData).length === submitedQuestions.length) {
        await appRef
          .child(`/users_info/${auth.currentUser.uid}/all_certificate`)
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
  };
};

export default TestQuestionShowLogic;
