import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import appRef from "../../Firebase/Firebase";

const QuestionShowLogic = () => {

  const {languageName, questionId} = useParams();

  const [questionData, setQuestionData] = useState({});
  const [questionShowCodeEditor, setQuestionShowCodeEditor] = useState();

  // Code editor here
  useEffect(() => {
    appRef
      .child(`/languages_questions/${languageName}/${questionId}`)
      .get()
      .then((res) => {
        let questionContainer =
          document.getElementsByClassName("question-container")[0];
        questionContainer.innerHTML = res.val().question_detail_HTML;
        setQuestionData(res.val());
      });
  }, []);

  useEffect(() => {
    if (questionData.default_code) {
      setQuestionShowCodeEditor(questionData.default_code);
    }
  }, [questionData]);

  const getCodeEditorData = (newValue) => {
    console.log("change", newValue);
    setQuestionShowCodeEditor(newValue);
  }
  
  const resetDefaultCode = () => {
    setQuestionShowCodeEditor(questionData.default_code);
  };

  return { questionData, questionShowCodeEditor, resetDefaultCode, getCodeEditorData };
};

export default QuestionShowLogic;
