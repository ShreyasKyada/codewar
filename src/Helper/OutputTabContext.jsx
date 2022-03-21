import { TabContext, TabPanel } from "@mui/lab";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import AceEditor from "react-ace";
import React, { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import "./OutputTabContext.css";

const OutputTabContext = ({
  functions,
  tabContextData,
  compilerErrors,
  codeEditorInfo,
  isCompilerLoadingState,
  customInput,
  customOutput,
  isSubmitState,
}) => {
  // fuctions
  const { value, handleChange } = functions;

  // code editor
  const { editorMode, activeTheme } = codeEditorInfo;

  const [isWrongAns, setIsWrongAns] = useState(false);
  let isWrongAnsCount = 0;

  for (let i = 0; i < tabContextData.length; i++) {
    if (tabContextData[i].error === "Wrong Answer") {
      isWrongAnsCount = isWrongAnsCount + 1;
    }
  }

  useEffect(() => {
    setIsWrongAns(false);
    for (let i = 0; i < tabContextData.length; i++) {
      if (tabContextData[i].error === "Wrong Answer") {
        setIsWrongAns(true);
      }
    }
  }, [tabContextData]);

  return (
    <>
      <div className="test-case-headings-container">
        {compilerErrors.errorHeading === "Compilation error" &&
          !isCompilerLoadingState && (
            <div className="compilation-error-container">
              <p className="test-case-heading red">{`Compilation error :(`} </p>
              <p className="test-case-error-info">
                Check the compiler output, fix the error and try again.
              </p>
            </div>
          )}
        {!isSubmitState && isWrongAns && !isCompilerLoadingState && (
          <div className="compilation-error-container">
            <p className="test-case-heading red">{`Wrong Answer :(`} </p>
          </div>
        )}
        {isSubmitState && isWrongAns && !isCompilerLoadingState && (
          <div className="compilation-error-container">
            <p className="test-case-heading red">
              {`${isWrongAnsCount}/${tabContextData.length} test cases failed :(`}{" "}
            </p>
          </div>
        )}
        {compilerErrors.errorHeading === "none" &&
          !isCompilerLoadingState &&
          !isWrongAns &&
          isSubmitState && (
            <div className="compilation-error-container">
              <p className="test-case-heading green">Congratulations! </p>
              <p className="test-case-error-info">
                Congratulations you passed all test cases!! now you can switch
                to next questions...
              </p>
            </div>
          )}
        {compilerErrors.errorHeading === "none" &&
          !isCompilerLoadingState &&
          !isWrongAns &&
          !isSubmitState && (
            <div className="compilation-error-container">
              <p className="test-case-heading green">Congratulations! </p>
              <p className="test-case-error-info">
                You have passed the sample test cases. Click the submit button
                to run your code against all the test cases.{" "}
              </p>
            </div>
          )}
      </div>
      <div className="question-show-testcase-tabs" id="scroll-div">
        {isCompilerLoadingState && (
          <div className="loading-state">
            <CircularProgress />
            <p>Loading...</p>
          </div>
        )}

        {compilerErrors.errorHeading === "Compilation error" &&
          !isCompilerLoadingState && (
            <div className="compilation-error-container-msg">
              <AceEditor
                mode={`${editorMode}`}
                theme={activeTheme.toLowerCase().replace(" ", "_")}
                width="100%"
                editorProps={{ $blockScrolling: true }}
                className="tabpanel-code-editor"
                setOptions={{
                  fontSize: 18,
                  highlightActiveLine: false,
                  selectionStyle: "text",
                  highlightSelectedWord: false,
                  highlightGutterLine: false,
                  showGutter: true,
                }}
                maxLines={600}
                minLines={1}
                readOnly={true}
                value={`${compilerErrors.error}`}
              />
            </div>
          )}

        {/* Custome output container */}
        {customInput && !isCompilerLoadingState ? (
          <div className="output-container" style={{ width: "100%" }}>
            <section className="input-stdin-container">
              <p className="input-stdin-heading">Input (stdin)</p>
              <AceEditor
                mode={`${editorMode}`}
                theme={activeTheme.toLowerCase().replace(" ", "_")}
                width="100%"
                editorProps={{ $blockScrolling: true }}
                className="tabpanel-code-editor"
                value={customInput}
                setOptions={{
                  fontSize: 17,
                  highlightActiveLine: false,
                  highlightGutterLine: false,
                }}
                maxLines={600}
                minLines={1}
                readOnly={true}
              />
            </section>
            <section className="your-output-container">
              <p className="input-stdin-heading">Your Output (stdout)</p>
              <AceEditor
                mode={`${editorMode}`}
                theme={activeTheme.toLowerCase().replace(" ", "_")}
                width="100%"
                editorProps={{ $blockScrolling: true }}
                className="tabpanel-code-editor"
                setOptions={{
                  fontSize: 17,
                  highlightActiveLine: false,
                  highlightGutterLine: false,
                }}
                maxLines={600}
                minLines={1}
                readOnly={true}
                value={`${customOutput}`}
              />
            </section>
          </div>
        ) : (
          !isCompilerLoadingState &&
          (compilerErrors.errorHeading === "none" || isWrongAns) && (
            <TabContext value={value}>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                className="question-show-tabs"
              >
                {tabContextData.map((val, index) => {
                  return (
                    <Tab
                      key={index}
                      value={`${index + 1}`}
                      label={
                        tabContextData[index].error === "none" ? (
                          <p className="tab-name-p">
                            <BsCheck2Circle className="tab-name-icon" />
                            {tabContextData[index].mode === "sample"
                              ? "Sample Test Case " + index
                              : "Test Case " + index}
                          </p>
                        ) : (
                          <p className="tab-name-p">
                            <MdOutlineClose className="tab-name-icon" />{" "}
                            {tabContextData[index].mode === "sample"
                              ? "Sample Test Case " + index
                              : "Test Case " + index}
                          </p>
                        )
                      }
                      className={
                        tabContextData[index].error === "none"
                          ? "question-show-tab question-show-tab-green"
                          : "question-show-tab question-show-tab-red"
                      }
                    />
                  );
                })}
              </Tabs>
              {tabContextData.map((val, index) => {
                return (
                  <TabPanel
                    key={index}
                    className="question-show-tabPanel"
                    value={`${index + 1}`}
                  >
                    <div className="output-container">
                      {tabContextData[index].error === "Wrong Answer" && (
                        <section className="compiler-msg-container">
                          <p className="input-stdin-heading">
                            Compiler Message
                          </p>
                          <AceEditor
                            mode={`${editorMode}`}
                            theme={activeTheme.toLowerCase().replace(" ", "_")}
                            width="100%"
                            editorProps={{ $blockScrolling: true }}
                            className="tabpanel-code-editor"
                            setOptions={{
                              fontSize: 18,
                              highlightActiveLine: false,
                              selectionStyle: "text",
                              highlightSelectedWord: false,
                              highlightGutterLine: false,
                              showGutter: false,
                            }}
                            maxLines={600}
                            minLines={1}
                            readOnly={true}
                            value={`Wrong Answer`}
                          />
                        </section>
                      )}
                      <section className="input-stdin-container">
                        <p className="input-stdin-heading">Input (stdin)</p>
                        <AceEditor
                          mode={`${editorMode}`}
                          theme={activeTheme.toLowerCase().replace(" ", "_")}
                          width="100%"
                          editorProps={{ $blockScrolling: true }}
                          className="tabpanel-code-editor"
                          value={
                            tabContextData[index].input
                              ? `${tabContextData[index].input}`
                              : ""
                          }
                          setOptions={{
                            fontSize: 17,
                            highlightActiveLine: false,
                            highlightGutterLine: false,
                          }}
                          maxLines={600}
                          minLines={1}
                          readOnly={true}
                        />
                      </section>
                      <section className="your-output-container">
                        <p className="input-stdin-heading">
                          Your Output (stdout)
                        </p>
                        <AceEditor
                          mode={`${editorMode}`}
                          theme={activeTheme.toLowerCase().replace(" ", "_")}
                          width="100%"
                          editorProps={{ $blockScrolling: true }}
                          className="tabpanel-code-editor"
                          setOptions={{
                            fontSize: 17,
                            highlightActiveLine: false,
                            highlightGutterLine: false,
                          }}
                          maxLines={600}
                          minLines={1}
                          readOnly={true}
                          value={`${tabContextData[index].output}`}
                        />
                      </section>
                      <section className="expected-output-container">
                        <p className="input-stdin-heading">Expected Output</p>
                        <AceEditor
                          mode={`${editorMode}`}
                          theme={activeTheme.toLowerCase().replace(" ", "_")}
                          width="100%"
                          editorProps={{ $blockScrolling: true }}
                          className="tabpanel-code-editor"
                          setOptions={{
                            fontSize: 17,
                            highlightActiveLine: false,
                            highlightGutterLine: false,
                          }}
                          maxLines={600}
                          minLines={1}
                          readOnly={true}
                          value={`${tabContextData[index].expectedOutput}`}
                        />
                      </section>
                    </div>
                  </TabPanel>
                );
              })}
            </TabContext>
          )
        )}
      </div>
    </>
  );
};

export default OutputTabContext;
