import { useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { loginContext } from "../../Context/LoginContext";
import appRef, { auth } from "../../Firebase/Firebase";
import {
  getCodeEditorLanguageMode,
  CodeEditorSupportedThemes,
} from "../../Helper/CodeEditorThemes";
import { codeRuner } from "../../Helper/CodeRuner";

const QuestionShowLogic = () => {
  const { languageName, questionId } = useParams();
  const [questionData, setQuestionData] = useState({});
  const [questionShowCodeEditor, setQuestionShowCodeEditor] = useState();
  const [isShowTextarea, setIsShowTextarea] = useState(false);
  const [supportedThemes, setSupportedThemes] = useState([]);
  const [activeTheme, setActiveTheme] = useState("Chaos");
  const [activeLanguage, setActiveLanguage] = useState({
    name: "",
    compiler_name: "",
    index: "",
  });
  const [value, setValue] = useState("1");
  const [isShowTestCase, setIsShowTestCase] = useState(true);
  const [compilerErrors, setCompilerErrors] = useState([
    {
      errorHeading: "",
      error: "",
    },
  ]);
  const [isCompilerLoadingState, setIsCompilerLoadingState] = useState(true);
  const [editorMode, setEditorMode] = useState("");
  const [isSubmitState, setIsSubmitState] = useState(false);
  const [tabContextData, setTabContextData] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [allLanguagesName, setAllLanguagesName] = useState([]);
  const { score } = useContext(authContext);
  const { setSnackbarData } = useContext(loginContext);
  const smallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (smallScreen) {
      setSnackbarData(
        "We recommend to open in desktop for the best experience.",
        "error"
      );
    }
  }, [smallScreen]);

  // Code editor here
  useEffect(() => {
    appRef
      .child(`/languages_questions/${languageName}/${questionId}`)
      .on("value", (res) => {
        setQuestionData(res.val());
      });
  }, []);

  // set default languages and themes
  useEffect(() => {
    setSupportedThemes(CodeEditorSupportedThemes());
    if (languageName === "Data structures") {
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
    } else {
      setActiveLanguage(languageName);
      setEditorMode(getCodeEditorLanguageMode(languageName));
    }
  }, []);

  useEffect(() => {
    if (questionData.default_code) {
      setQuestionShowCodeEditor(questionData.default_code);
    }
  }, [questionData]);

  const getCodeEditorData = (newValue) => {
    setQuestionShowCodeEditor(newValue);
  };

  const resetDefaultCode = () => {
    setQuestionShowCodeEditor(questionData.default_code);
  };

  const getInputboxVisiableState = () => {
    setIsShowTextarea(!isShowTextarea);
  };

  const getCustomInputData = (event) => {
    setCustomInput(event.target.value);
  };

  const getActiveTheme = (event) => {
    setActiveTheme(event.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function scroll(current, target) {
    setTimeout(() => {
      if (current <= target) {
        current = current + 15;
        window.scrollTo(0, current);
        scroll(current, target);
      }
    }, 20);
  }

  function scrollDiv(offSet) {
    let target = offSet;
    let current =
      document.getElementsByClassName("question-show-run-btn")[0].offsetTop -
      620;
    scroll(current, target);
  }

  const runCode = async () => {
    // scroll to div
    setIsShowTestCase(true);
    setIsCompilerLoadingState(true);
    setIsSubmitState(false);
    document
      .getElementById("scroll-div")
      .setAttribute(
        "style",
        "margin: 2.5rem 0; visibility: visible; margin-top: 0.4rem"
      );
    scrollDiv(document.getElementById("scroll-div").offsetTop - 100);
    appRef
      .child(
        `users_info/${auth.currentUser.uid}/solved_question/${questionId}/`
      )
      .set({
        id: questionId,
        difficulty_level: questionData.difficulty_level,
        status: "run",
        question_heading: questionData.question_heading,
        language_name: languageName,
      });

    // runCode
    if (customInput) {
      const executionData = await codeRuner(
        questionShowCodeEditor,
        languageName,
        customInput,
        "customOutput"
      );
      setCompilerErrors(executionData.error);
      setCustomOutput(executionData.output);
      setIsCompilerLoadingState(false);
    } else {
      let tempTabContextData = [];
      for (
        let i = 0;
        i < questionData.test_cases.sample_test_case.length;
        i++
      ) {
        const executionData = await codeRuner(
          questionShowCodeEditor,
          activeLanguage,
          questionData.test_cases.sample_test_case[i].input,
          questionData.test_cases.sample_test_case[i].output
        );
        setCompilerErrors(executionData.error);
        if (executionData.error.errorHeading === "Compilation error") {
          break;
        }

        tempTabContextData.push({
          mode: "sample",
          input: questionData.test_cases.sample_test_case[i].input,
          output: executionData.output,
          expectedOutput: questionData.test_cases.sample_test_case[i].output,
          error: executionData.error.errorHeading,
        });
      }
      setIsCompilerLoadingState(false);
      setTabContextData(Object.values(tempTabContextData));
    }
  };

  const submitCode = async () => {
    setIsSubmitState(true);
    let tempTabContextData = [];
    setIsShowTestCase(true);
    setIsCompilerLoadingState(true);
    document
      .getElementById("scroll-div")
      .setAttribute(
        "style",
        "margin: 2.5rem 0; visibility: visible; margin-top: 0.4rem"
      );
    scrollDiv(document.getElementById("scroll-div").offsetTop - 100);

    for (let i = 0; i < questionData.test_cases.sample_test_case.length; i++) {
      const executionData = await codeRuner(
        questionShowCodeEditor,
        activeLanguage,
        questionData.test_cases.sample_test_case[i].input,
        questionData.test_cases.sample_test_case[i].output
      );
      setCompilerErrors(executionData.error);
      if (executionData.error.errorHeading === "Compilation error") {
        break;
      }

      tempTabContextData.push({
        mode: "other",
        input: questionData.test_cases.sample_test_case[i].input,
        output: executionData.output,
        expectedOutput: questionData.test_cases.sample_test_case[i].output,
        error: executionData.error.errorHeading,
      });
    }

    if (questionData.test_cases.other_test_case) {
      for (let i = 0; i < questionData.test_cases.other_test_case.length; i++) {
        const executionData = await codeRuner(
          questionShowCodeEditor,
          languageName,
          questionData.test_cases.other_test_case[i].input,
          questionData.test_cases.other_test_case[i].output
        );
        setCompilerErrors(executionData.error);
        if (executionData.error.errorHeading === "Compilation error") {
          break;
        }

        tempTabContextData.push({
          mode: "other",
          input: questionData.test_cases.other_test_case[i].input,
          output: executionData.output,
          expectedOutput: questionData.test_cases.other_test_case[i].output,
          error: executionData.error.errorHeading,
        });
      }
    }
    let flag = true;
    for (let i = 0; i < tempTabContextData.length; i++) {
      if (tempTabContextData[i].error !== "none") {
        flag = false;
      }
    }

    if (flag) {
      await appRef
        .child(
          `users_info/${auth.currentUser.uid}/solved_question/${questionId}`
        )
        .set({
          id: questionId,
          difficulty_level: questionData.difficulty_level,
          status: "submited",
          question_heading: questionData.question_heading,
          language_name: languageName,
        });

      await appRef
        .child(`users_info/${auth.currentUser.uid}/score`)
        .set(score + parseInt(questionData.max_score));
    }

    setIsCompilerLoadingState(false);
    setTabContextData(Object.values(tempTabContextData));
  };

  const getActiveLang = (e) => {
    
    setActiveLanguage(e.value);
    setEditorMode(getCodeEditorLanguageMode(e.value));
  };

  return {
    questionData,
    questionShowCodeEditor,
    resetDefaultCode,
    getCodeEditorData,
    getInputboxVisiableState,
    isShowTextarea,
    customInput,
    getCustomInputData,
    supportedThemes,
    activeTheme,
    getActiveTheme,
    runCode,
    activeLanguage,
    value,
    handleChange,
    isShowTestCase,
    compilerErrors,
    isCompilerLoadingState,
    editorMode,
    languageName,
    tabContextData,
    customOutput,
    submitCode,
    isSubmitState,
    allLanguagesName,
    getActiveLang,
  };
};

export default QuestionShowLogic;
