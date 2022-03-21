import React from "react";
import "./QuestionShow.css";
import AceEditor from "react-ace";
import { BiReset } from "react-icons/bi";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Tab,
  Tabs,
} from "@mui/material";
import QuestionShowLogic from "./QuestionShowLogic";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/actionscript";
import "ace-builds/webpack-resolver";

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

import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-dawn";
import SubHeader from "../../Components/SubHeader/SubHeader";
import OutputTabContext from "../../Helper/OutputTabContext";

const QuestionShow = () => {
  const {
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
  } = QuestionShowLogic();

  return (
    <>
      {questionData.question_heading && (
        <SubHeader
          subHeaderNevigationLink={{
            Dashboard: {
              name: "Dashboard",
              link: "/dashboard",
            },
            languageName: {
              name: languageName,
              link: `/dashboard/${languageName}`,
            },
            questionName: {
              name: `${questionData.question_heading}`,
              link: "",
            },
          }}
        />
      )}
      <div className="question-show-container">
        <div className="question-show-sub-container">
          <div className="question-show-left-side-container">
            <div className="question-container">{/* {questionData} */}</div>

            <div className="question-code-editor">
              <section className="code-editor-header">
                <div className="theme-container">
                  <p>Theme</p>
                  <Dropdown
                    options={supportedThemes}
                    value={activeTheme}
                    className="theme-dropdown"
                    controlClassName="question-control-class"
                    onChange={getActiveTheme}
                  />
                </div>
                <div className="languages-container">
                  <p>Language</p>
                  <Dropdown
                    options={[activeLanguage]}
                    value={activeLanguage}
                    className="language-dropdown"
                    controlClassName="question-control-class"
                  />
                </div>

                <div className="question-show-icon-container">
                  <BiReset onClick={resetDefaultCode} />
                </div>
              </section>
              <AceEditor
                mode={`${editorMode}`}
                theme={activeTheme.toLowerCase().replace(" ", "_")}
                onChange={getCodeEditorData}
                width="100%"
                className="question-show-editor"
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  showPrintMargin: false,
                  tabSize: 2,
                  fontSize: 18,
                  wrap: true,
                }}
                value={questionShowCodeEditor ? questionShowCodeEditor : ""}
              />
            </div>
            <div className="question-show-bottom-container">
              <div className="question-show-button-container">
                <Button
                  className="question-show-btn question-show-submit-btn"
                  variant="contained"
                  onClick={submitCode}
                >
                  Submit Code
                </Button>
                <Button
                  className="question-show-btn question-show-run-btn"
                  variant="outlined"
                  onClick={runCode}
                >
                  Run Code
                </Button>
              </div>
              <div className="test-against-container">
                <FormControlLabel
                  control={<Checkbox className="check-box" />}
                  label="Test against custom input"
                  className="check-box"
                  onChange={getInputboxVisiableState}
                  name="test-against"
                />
              </div>
              {isShowTextarea && (
                <div className="get-input-textarea">
                  <textarea value={customInput} onChange={getCustomInputData} />
                </div>
              )}
            </div>

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

          <div className="question-show-right-side-container">
            <p>
              Author <span>{questionData.author}</span>
            </p>
            <p>
              Difficulty <span>{questionData.difficulty_level}</span>
            </p>
            <p>
              Max score <span>{questionData.max_score}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionShow;
