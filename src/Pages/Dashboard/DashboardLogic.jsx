import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../Context/LoginContext";
import appRef from "../../Firebase/Firebase";

const DashboardLogic = () => {
  const [allLanguages, setAllLanguages] = useState({});
  const [twoCertificate, setTwoCertificate] = useState({});
  const [isLanguageSkeleton, setIsLanguageSkeleton] = useState(true);
  const [isCertificateSkeleton, setIsCertificateSkeleton] = useState(true);
  const { setIsLoadingState } = useContext(loginContext);

  useEffect(() => {
    let cleanUp = true;

    if (cleanUp) {
      setIsLoadingState(true);
      appRef
        .child("/certificate")
        .limitToLast(2)
        .on("value", (snapshot) => {
          if (cleanUp) {
            setTwoCertificate(snapshot.val());
            setIsCertificateSkeleton(false);
            setIsLoadingState(false);
          }
        });

      appRef.child("/languages").on("value", (snap) => {
        if (cleanUp) {
          setAllLanguages(snap.val());
          setIsLanguageSkeleton(false);
          setIsLoadingState(false);
        }
      });
    }

    return () => {
      cleanUp = false;
    };
  }, []);

  return {
    allLanguages,
    isLanguageSkeleton,
    isCertificateSkeleton,
    twoCertificate,
  };
};

export default DashboardLogic;
