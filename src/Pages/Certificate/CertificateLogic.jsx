import { useEffect, useState } from "react";
import appRef from "../../Firebase/Firebase";

const CertificateLogic = () => {
  const [certificateList, setCertificateList] = useState({});

  useEffect(() => {
    let cleanUp = true;

    if (cleanUp) {
      appRef.child("/certificate").on("value", (snapshot) => {
        setCertificateList(snapshot.val());
      });
    }

    return () => {
      cleanUp = false;
    };
  }, []);

  return {certificateList};
};

export default CertificateLogic;
