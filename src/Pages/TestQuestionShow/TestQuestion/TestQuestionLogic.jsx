import { useEffect, useState } from "react";
import { codeRuner } from "../../../Helper/CodeRuner";
import appRef from "../../../Firebase/Firebase";

const TestQuestionLogic = (
  activeLanguage,
  testQuestion,
  submitedQuestions,
  setSubmitedQuestions,
  id
) => {
  const [value, setValue] = useState("1");
  const [isShowTestCase, setIsShowTestCase] = useState(false);
  const [compilerErrors, setCompilerErrors] = useState([
    {
      errorHeading: "",
      error: "",
    },
  ]);
  const [activeTheme, setActiveTheme] = useState("Chaos");
  const [isSubmitState, setIsSubmitState] = useState(false);
  const [isCompilerLoadingState, setIsCompilerLoadingState] = useState(true);
  const [tabContextData, setTabContextData] = useState([
    // {
    //   mode: ""
    //   input: "",
    //   output: "",
    //   expectedOutput: "",
    // },
  ]);
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [codeEditorData, setCodeEditorData] = useState("");
  const [isShowTextarea, setIsShowTextarea] = useState(false);

  useEffect(() => {
    setCodeEditorData(testQuestion.default_code);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetDefaultCode = (code) => {
    setCodeEditorData(code);
  };

  const getCodeEditorData = (newValue) => {
    setCodeEditorData(newValue);
  };

  const getInputboxVisiableState = () => {
    setIsShowTextarea(!isShowTextarea);
  };

  const getCustomInputData = (event) => {
    setCustomInput(event.target.value);
  };

  useEffect(() => {
    if (isShowTestCase) {
      document
        .getElementById("scroll-div")
        .setAttribute(
          "style",
          "margin: 2.5rem 0; visibility: visible; margin-top: 0.4rem"
        );
    }
  }, [isShowTestCase]);

  const runCodeClickHandler = async (testCases) => {
    setIsShowTestCase(true);
    setIsCompilerLoadingState(true);
    setIsSubmitState(false);

    // runCode
    if (customInput) {
      const executionData = await codeRuner(
        codeEditorData,
        activeLanguage,
        customInput,
        "customOutput"
      );
      setCompilerErrors(executionData.error);
      setCustomOutput(executionData.output);
      setIsCompilerLoadingState(false);
    } else {
      let tempTabContextData = [];
      for (let i = 0; i < testCases.sample_test_case.length; i++) {
        const executionData = await codeRuner(
          codeEditorData,
          activeLanguage,
          testCases.sample_test_case[i].input,
          testCases.sample_test_case[i].output
        );
        setCompilerErrors(executionData.error);
        if (executionData.error.errorHeading === "Compilation error") {
          break;
        }

        tempTabContextData.push({
          mode: "sample",
          input: testCases.sample_test_case[i].input,
          output: executionData.output,
          expectedOutput: testCases.sample_test_case[i].output,
          error: executionData.error.errorHeading,
        });
      }
      setIsCompilerLoadingState(false);
      setTabContextData(Object.values(tempTabContextData));
    }
  };

  const submitCode = async (testCases) => {
    setIsSubmitState(true);
    setIsShowTestCase(true);
    setIsCompilerLoadingState(true);
    let tempTabContextData = [];

    for (let i = 0; i < testCases.sample_test_case.length; i++) {
      const executionData = await codeRuner(
        codeEditorData,
        activeLanguage,
        testCases.sample_test_case[i].input,
        testCases.sample_test_case[i].output
      );
      setCompilerErrors(executionData.error);
      if (executionData.error.errorHeading === "Compilation error") {
        break;
      }

      tempTabContextData.push({
        mode: "other",
        input: testCases.sample_test_case[i].input,
        output: executionData.output,
        expectedOutput: testCases.sample_test_case[i].output,
        error: executionData.error.errorHeading,
      });
    }

    if (testCases.other_test_case) {
      for (let i = 0; i < testCases.other_test_case.length; i++) {
        const executionData = await codeRuner(
          codeEditorData,
          activeLanguage,
          testCases.other_test_case[i].input,
          testCases.other_test_case[i].output
        );
        setCompilerErrors(executionData.error);
        if (executionData.error.errorHeading === "Compilation error") {
          break;
        }

        tempTabContextData.push({
          mode: "other",
          input: testCases.other_test_case[i].input,
          output: executionData.output,
          expectedOutput: testCases.other_test_case[i].output,
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

    if (flag && submitedQuestions.indexOf(id) === -1) {
      let tempArr = submitedQuestions;
      tempArr.push(id);
      setSubmitedQuestions(Object.values(tempArr));
    }

    setIsCompilerLoadingState(false);
    setTabContextData(Object.values(tempTabContextData));
  };

  return {
    value,
    handleChange,
    runCodeClickHandler,
    isShowTestCase,
    tabContextData,
    compilerErrors,
    activeTheme,
    isCompilerLoadingState,
    isSubmitState,
    customInput,
    customOutput,
    getCodeEditorData,
    codeEditorData,
    isShowTextarea,
    getInputboxVisiableState,
    getCustomInputData,
    resetDefaultCode,
    submitCode,
  };
};

export default TestQuestionLogic;
