import React from "react";
import "./QuestionShow.css";
import AceEditor from "react-ace";
import { BiReset } from "react-icons/bi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import QuestionShowLogic from "./QuestionShowLogic";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/actionscript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";

const QuestionShow = () => {
  const {
    questionData,
    questionShowCodeEditor,
    resetDefaultCode,
    getCodeEditorData,
  } = QuestionShowLogic();

  return (
    <div className="question-show-container">
      <div className="question-show-sub-container">
        <div className="question-show-left-side-container">
          <div className="question-container">{/* {questionData} */}</div>

          <div className="question-code-editor">
            <section className="code-editor-header">
              <div className="theme-container">
                <FormControl fullWidth className="language-form-control">
                  <InputLabel id="theme-select-label">Theme</InputLabel>
                  <Select
                    labelId="theme-select-label"
                    value={""}
                    className="language-select-box"
                    label="Theme"
                    // onChange={handleChange}
                  >
                    <MenuItem className="language-menu-items" value="1">Ten</MenuItem>
                    <MenuItem className="language-menu-items" value="2">Twenty</MenuItem>
                    <MenuItem className="language-menu-items" value="3">Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="languages-container">
                <FormControl fullWidth className="language-form-control">
                  <InputLabel id="language-select-label">Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    className="language-select-box"
                    label="Language"
                    // value={age}
                    // onChange={handleChange}
                  >
                    <MenuItem className="language-menu-items">Ten</MenuItem>
                    <MenuItem className="language-menu-items">Twenty</MenuItem>
                    <MenuItem className="language-menu-items">Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="question-show-icon-container">
                <BiReset onClick={resetDefaultCode} />
              </div>
            </section>
            <AceEditor
              mode="c_cpp"
              theme="monokai"
              onChange={getCodeEditorData}
              width="100%"
              editorProps={{ $blockScrolling: true }}
              className="question-show-editor"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                showPrintMargin: false,
                tabSize: 2,
                fontSize: 18,
              }}
              value={
                questionShowCodeEditor ? questionShowCodeEditor : "Not done"
              }
            />
          </div>
        </div>
        <div className="question-show-right-side-container">
          <p>
            Author <span>I m pote</span>
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
  );
};

export default QuestionShow;
