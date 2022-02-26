import { useEffect, useState } from "react";
import appRef from "../../Firebase/Firebase";

const DashboardLogic = () => {
  const [allLanguages, setAllLanguages] = useState({});

  useEffect(() => {
    let cleanUp = true;

    if (cleanUp) {
      appRef.child("/languages").on("value", (snap) => {
        setAllLanguages(snap.val());
      });
    }

    return () => {
      cleanUp = false;
    };
  }, []);

  return {
    allLanguages,
  };
};

export default DashboardLogic;
