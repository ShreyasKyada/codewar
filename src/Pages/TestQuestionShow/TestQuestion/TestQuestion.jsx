import React, { useContext, useEffect } from "react";
import "./TestQuestion.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Resizable } from "re-resizable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { themeContext } from "../../../Context/ThemeContext";
import { BsMoon } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import AceEditor from "react-ace";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/actionscript";
import "ace-builds/src-noconflict/theme-chaos";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-vbscript";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-javascript";

import { Button, Checkbox, FormControlLabel } from "@mui/material";
import OutputTabContext from "../../../Helper/OutputTabContext";
import TestQuestionLogic from "./TestQuestionLogic";
import { Editor } from "@tinymce/tinymce-react";

const TestQuestion = ({
  testQuestion,
  activeLanguage,
  editorMode,
  submitedQuestions,
  setSubmitedQuestions,
  id,
  allLanguagesName,
  getActiveLang,
}) => {
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);

  const {
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
  } = TestQuestionLogic(
    activeLanguage,
    testQuestion,
    submitedQuestions,
    setSubmitedQuestions,
    id
  );

  const toggleDarkMode = () => {
    if (isDarkMode) setIsDarkMode(false);
    else setIsDarkMode(true);
  };

  document.title = `${testQuestion.question_heading} | CodeWar`;

  return (
    <div className="test-question">
      <Resizable
        className="test-left-side-container"
        minWidth={"18%"}
        maxWidth={"55%"}
        enable={{ right: true }}
      >
        <div className="test-question-detail-container">
          <Editor
            value={testQuestion.question_detail_HTML}
            className="text-editor"
            selector="div"
            init={{
              setup: function (editor) {
                editor.on("init", () => {
                  const head = document.getElementsByClassName(
                    "tox-edit-area__iframe"
                  )[0].contentWindow.document.head;

                  head.insertAdjacentHTML(
                    "beforeend",
                    `<style>::-webkit-scrollbar {
                      
                      width: 7.5px;
                      background-color: #1e1e1e;
                      border-radius: 10px;
                    }
                    
                    ::-webkit-scrollbar-thumb {
                      background-color: rgb(99, 99, 99);
                      border-radius: 10px;
                    }
                    </style>`
                  );

                  document
                    .getElementsByClassName("tox-edit-area__iframe")[0]
                    .contentWindow.document.body.setAttribute(
                      "style",
                      "color: white !important;"
                    );
                });
              },
              readonly: true,
              menubar: false,

              plugins: ["autoresize"],
            }}
          />
        </div>
        <div className="horizontal-line">
          <div className="indicator-icon-container">
            <DragIndicatorIcon className="drag-indicator-icon" />
            <DragIndicatorIcon className="drag-indicator-icon" />
            <DragIndicatorIcon className="drag-indicator-icon" />
          </div>
        </div>
      </Resizable>
      <div className="test-right-side-container">
        <div className="test-right-top-container">
          <div className="test-language-dropdown-container">
            <p>Language</p>
            {allLanguagesName.length > 0 ? (
              <Dropdown
                options={allLanguagesName}
                value={allLanguagesName ? allLanguagesName[0] : ""}
                className="test-language-dropdown"
                controlClassName="test-question-control-class"
                onChange={getActiveLang}
              />
            ) : (
              <Dropdown
                options={[activeLanguage]}
                value={activeLanguage ? `${activeLanguage}` : ""}
                className="test-language-dropdown"
                controlClassName="test-question-control-class"
              />
            )}
          </div>
          <div className="test-question-other-icons">
            <div className="test-question-theme-icon">
              {isDarkMode ? (
                <BsMoon
                  className="navbar-theme-icon-moon"
                  onClick={toggleDarkMode}
                />
              ) : (
                <LightModeOutlinedIcon
                  className="navbar-theme-icon"
                  onClick={toggleDarkMode}
                />
              )}
            </div>
            <div className="test-question-reset-icons">
              <BiReset
                onClick={() => resetDefaultCode(testQuestion.default_code)}
              />
            </div>
          </div>
        </div>
        <div className="test-right-bottom-container">
          {editorMode && (
            <AceEditor
              mode={`${editorMode}`}
              theme="chaos"
              onChange={getCodeEditorData}
              Width="100%"
              editorProps={{ $blockScrolling: false }}
              className="test-question-code-editor"
              setOptions={{
                wrapBehavioursEnabled: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                autoScrollEditorIntoView: true,
                showLineNumbers: true,
                showPrintMargin: false,
                tabSize: 2,
                fontSize: 18,
                wrap: 1,
              }}
              value={codeEditorData ? codeEditorData : ""}
            />
          )}
        </div>
        <div className="test-code-submit-btn-container">
          <div className="test-against-container">
            <FormControlLabel
              control={<Checkbox className="check-box" />}
              label="Test against custom input"
              className="check-box"
              onChange={getInputboxVisiableState}
              name="test-against"
            />
          </div>
          <Button
            className="test-btn success-btn"
            variant="contained"
            onClick={() => submitCode(testQuestion.test_cases)}
          >
            {submitedQuestions.indexOf(id) !== -1 ? "Submited" : "Submit"}
            {/* Submit */}
          </Button>
          <Button
            className="test-btn"
            variant="outlined"
            onClick={() => {
              runCodeClickHandler(testQuestion.test_cases);
            }}
          >
            Run Code
          </Button>
        </div>
        {isShowTextarea && (
          <div
            className="get-input-textarea"
            style={{ margin: "0.8rem 0.7rem" }}
          >
            <textarea value={customInput} onChange={getCustomInputData} />
          </div>
        )}
        <div className="tab-context-container">
          {isShowTestCase && (
            <OutputTabContext
              functions={{ value, handleChange }}
              tabContextData={tabContextData}
              compilerErrors={compilerErrors}
              codeEditorInfo={{ editorMode, activeTheme }}
              isCompilerLoadingState={isCompilerLoadingState}
              customInput={customInput}
              customOutput={customOutput}
              isSubmitState={isSubmitState}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestQuestion;
