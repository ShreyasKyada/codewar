import React, { useContext, useEffect } from "react";
import { loginContext } from "../../Context/LoginContext";

const TestQuestionShow = () => {
  const { setIsShowNavbar } = useContext(loginContext);

  useEffect(() => {
    setIsShowNavbar(false);
  }, []);

  return (
    <>
      <h1>Shreyas</h1>
    </>
  );
};

export default TestQuestionShow;
