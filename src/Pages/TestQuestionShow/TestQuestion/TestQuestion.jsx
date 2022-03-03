import React, { useContext } from "react";
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
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import { Button } from "@mui/material";

const TestQuestion = () => {
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);

  const makeDragable = (event) => {
    console.log(event);
  };
  const upEvent = (event) => {
    console.log(event);
  };
  const toggleDarkMode = () => {
    if (isDarkMode) setIsDarkMode(false);
    else setIsDarkMode(true);
  };
  return (
    <div className="test-question">
      <Resizable
        className="test-left-side-container"
        minWidth={"18%"}
        maxWidth={"60%"}
        enable={{ right: true }}
      >
        <div className="test-question-detail-container"></div>
        <div
          className="horizontal-line"
          onMouseDown={makeDragable}
          onMouseUp={upEvent}
        >
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
            <Dropdown
              options={["1", "none"]}
              value="javascript"
              className="test-language-dropdown"
              controlClassName="test-question-control-class"
            />
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
              <BiReset />
            </div>
          </div>
        </div>
        <div className="test-right-bottom-container">
          <AceEditor
            mode="c_cpp"
            theme="monokai"
            // onChange={getCodeEditorData}
            width="100%"
            editorProps={{ $blockScrolling: true }}
            className="test-question-code-editor"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              showPrintMargin: false,
              tabSize: 2,
              fontSize: 18,
            }}
            // value={questionShowCodeEditor ? questionShowCodeEditor : "Not done"}
          />
        </div>
        <div className="test-code-submit-btn-container">
          <Button className="test-btn test-result-btn" variant="text">
            Test Results
          </Button>
          <Button className="test-btn success-btn" variant="contained">
            Submit
          </Button>
          <Button className="test-btn" variant="outlined">
            Run Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestQuestion;
