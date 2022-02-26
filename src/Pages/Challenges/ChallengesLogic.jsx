import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appRef from "../../Firebase/Firebase";

const ChallengesLogic = () => {
  const { languageName } = useParams();
    const [languageList, setLanguageList] = useState({});


  useEffect(() => {
    appRef.child(`/languages_questions/${languageName}`).on("value", (snapshot) => {
        setLanguageList(snapshot.val());
    });
  }, []);

  return {languageList, languageName};
};

export default ChallengesLogic;
