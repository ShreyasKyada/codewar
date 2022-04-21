import React, { useContext, useEffect } from "react";
import "./Playground.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import SaveIcon from "@mui/icons-material/Save";
import { Button, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AceEditor from "react-ace";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PlaygroundLogic from "./PlaygroundLogic";

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
import { loginContext } from "../../Context/LoginContext";

const Playground = () => {
  const {
    activeLanguage,
    editorMode,
    supportedThemes,
    activeTheme,
    getActiveTheme,
    runCode,
    PlaygroundLanguages,
    getActiveLang,
    getCodeEditorData,
    getCustomeInput,
    isCompilerLoadingState,
    customOutput,
    compilerErrors,
    isShowErrorBox,
    saveCodeHandler,
    getPlaygroundName,
    saveBtnStates,
    playgroundData
  } = PlaygroundLogic();

  
  const { setActiveTab } = useContext(loginContext);
  
  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) setActiveTab("Playground");
    
    document.title = `Playground | CodeWar`;
    return () => (cleanUp = false);
  }, []);

  return (
    <div className="playground-container">
      <div className="playground-left-container">
        <div className="playground-left-header">
          <div className="playground-name">
            <input
              type="text"
              className="playground-name-input"
              onChange={getPlaygroundName}
              value={playgroundData.playgroundName}
            />
            <EditIcon className="playground-edit-icon" />
          </div>
          <div className="playground-theme-language-container">
            <div className="playground-theme-dropdown">
              <Dropdown
                options={supportedThemes}
                value={activeTheme}
                className="theme-dropdown"
                controlClassName="question-control-class"
                onChange={getActiveTheme}
              />
            </div>
            <div className="playground-languages-dropdown">
              <Dropdown
                options={PlaygroundLanguages}
                value={activeLanguage}
                className="theme-dropdown"
                controlClassName="question-control-class"
                onChange={getActiveLang}
              />
            </div>
            <div className="playground-save-container">
              <Button
                className="playground-save-btn"
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={saveCodeHandler}
                disabled={saveBtnStates.loading ? true : false}
                color={saveBtnStates.saved ? "success" : "warning"}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <section className="playground-code-editor">
          {/* {console.log(playgroundCodeEditor)} */}
          <AceEditor
            mode={`${editorMode}`}
            theme={activeTheme.toLowerCase().replace(" ", "_")}
            onChange={getCodeEditorData}
            value={playgroundData.code}
            width="100%"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              showPrintMargin: false,
              tabSize: 2,
              fontSize: 17,
              wrap: true,
            }}
          />
        </section>
        <section>
          <Button
            className="playground-save-btn playground-run-btn"
            variant="outlined"
            startIcon={<PlayCircleIcon />}
            onClick={runCode}
          >
            Run Code
          </Button>
        </section>
      </div>
      <div className="playground-right-container">
        <section className="playground-stdout">
          <section className="playground-stdout-heading">
            <p className="playground-stdout-heading-output">Output: </p>
          </section>
          <section className="playground-output-container">
            {isCompilerLoadingState ? (
              <section className="playground-loading">
                <CircularProgress />
                <p>loading...</p>
              </section>
            ) : (
              isShowErrorBox && (
                <section className="playground-output-container">
                  <AceEditor
                    mode={`${editorMode}`}
                    theme={activeTheme.toLowerCase().replace(" ", "_")}
                    width="100%"
                    height="316px"
                    editorProps={{ $blockScrolling: true }}
                    className="playground-output-code-editor"
                    setOptions={{
                      fontSize: 18,
                      highlightActiveLine: false,
                      selectionStyle: "text",
                      highlightSelectedWord: false,
                      highlightGutterLine: false,
                      showGutter: true,
                      displayIndentGuides: true,
                      showGutter: false,
                      wrapEnabled: true,
                    }}
                    readOnly={true}
                    value={
                      compilerErrors.errorHeading === "none"
                        ? `${customOutput}`
                        : `${compilerErrors.error}`
                    }
                  />
                </section>
              )
            )}
          </section>
        </section>
        <section className="playground-stdin">
          <p className="playground-stdin-heading-stdin">stdin: </p>
          <textarea
            className="playground-stdin-textarea"
            onChange={getCustomeInput}
          ></textarea>
        </section>
      </div>
    </div>
  );
};

export default Playground;
