import { useEffect, useState } from "react";
import {
  getCodeEditorLanguageMode,
  CodeEditorSupportedThemes,
} from "../../Helper/CodeEditorThemes";
import { codeRuner } from "../../Helper/CodeRuner";
import appRef, { auth } from "../../Firebase/Firebase";
import { useParams } from "react-router-dom";

const PlaygroundLogic = () => {
  const [supportedThemes, setSupportedThemes] = useState([]);
  const [editorMode, setEditorMode] = useState("");
  const [activeTheme, setActiveTheme] = useState("chaos");
  const [isCompilerLoadingState, setIsCompilerLoadingState] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [compilerErrors, setCompilerErrors] = useState([
    {
      errorHeading: "",
      error: "",
    },
  ]);
  const [customOutput, setCustomOutput] = useState("");
  const [isShowErrorBox, setIsShowErrorBox] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("C");
  const [playgroundData, setPlaygroundData] = useState({
    playgroundName: "untitled",
    code: "",
  });
  const { id } = useParams();
  const [playgroundId, setPlaygroundId] = useState(id);
  const [saveBtnStates, setSaveBtnStates] = useState({
    loading: false,
    saved: true,
  });

  const PlaygroundLanguages = [
    "C",
    "C++",
    "Java",
    "Php",
    "Perl",
    "Python",
    "Ruby",
    "Sql",
    "C#",
    "Vb",
    "Swift",
    "Javascript",
  ];

  useEffect(() => {
    setSupportedThemes(CodeEditorSupportedThemes());
    setActiveLanguage("C");
    setEditorMode(getCodeEditorLanguageMode("C"));
    if (playgroundId !== "empty") {
      setPlaygroundId(id);
    }
  }, []);

  useEffect(() => {
    let cleanUp = true;
    if (playgroundId !== "empty") {
      appRef
        .child(`users_info/${auth.currentUser.uid}/playground/${id}`)
        .on("value", (snapshot) => {
          const snap = snapshot.val();
          if (cleanUp) {
            setActiveLanguage(snap.languageName);
            setPlaygroundData({
              playgroundName: snap.playgroundName,
              code: snap.code,
            });
          }
        });
    }

    return () => (cleanUp = false);
  }, [id]);

  const getActiveTheme = (event) => {
    setActiveTheme(event.value);
  };

  const getActiveLang = (event) => {
    setActiveLanguage(event.value);
    setEditorMode(getCodeEditorLanguageMode(event.value));
    setActiveLanguage(event.value);
  };

  const getCodeEditorData = (newValue) => {
    setSaveBtnStates({ ...saveBtnStates, saved: false });
    setPlaygroundData({ ...playgroundData, code: newValue });
  };

  const getCustomeInput = (event) => {
    setCustomInput(event.target.value);
  };

  const runCode = async () => {
    setIsCompilerLoadingState(true);
    setIsShowErrorBox(true);

    const executionData = await codeRuner(
      playgroundData.code,
      activeLanguage,
      customInput,
      "customOutput"
    );
    setCompilerErrors(executionData.error);
    setCustomOutput(executionData.output);
    setIsCompilerLoadingState(false);
  };

  const getPlaygroundName = (event) => {
    setSaveBtnStates({...saveBtnStates, saved: false});
    setPlaygroundData({
      ...playgroundData,
      playgroundName: event.target.value,
    });
  };

  const saveCodeHandler = () => {
    setSaveBtnStates({
      ...saveBtnStates,
      loading: true,
    });

    if (playgroundId === "empty") {
      let newKey = appRef
        .child(`users_info/${auth.currentUser.uid}/playground`)
        .push(
          {
            playgroundName: playgroundData.playgroundName,
            languageName: activeLanguage,
            code: playgroundData.code,
          },
          () => {
            setSaveBtnStates({
              loading: false,
              saved: true,
            });
          }
        ).key;

      setPlaygroundId(newKey);
    } else {
      // Edit state
      appRef
        .child(`users_info/${auth.currentUser.uid}/playground/${playgroundId}`)
        .set(
          {
            playgroundName: playgroundData.playgroundName,
            languageName: activeLanguage,
            code: playgroundData.code,
          },
          () => {
            setSaveBtnStates({
              loading: false,
              saved: true,
            });
          }
        );
    }
  };

  return {
    activeLanguage,
    editorMode,
    supportedThemes,
    activeTheme,
    getActiveTheme,
    runCode,
    PlaygroundLanguages,
    getActiveLang,
    PlaygroundLanguages,
    getCodeEditorData,
    getCustomeInput,
    isCompilerLoadingState,
    customOutput,
    compilerErrors,
    isShowErrorBox,
    saveCodeHandler,
    getPlaygroundName,
    saveBtnStates,
    playgroundData,
  };
};

export default PlaygroundLogic;
