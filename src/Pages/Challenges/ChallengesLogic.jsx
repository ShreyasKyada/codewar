import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appRef from "../../Firebase/Firebase";

const ChallengesLogic = () => {
  const { languageName } = useParams();
  const [languageList, setLanguageList] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    appRef
      .child(`/languages_questions/${languageName}`)
      .on("value", (snapshot) => {
        setLanguageList(snapshot.val());
      });
  }, []);

  const playWithFrdBtn = (id) => {
    navigate(`/user-profiles/${languageName}/${id}`);
  };

  return { languageList, languageName, playWithFrdBtn };
};

export default ChallengesLogic;
