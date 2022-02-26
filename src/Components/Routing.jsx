import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Verification from "./Verification";
import { authContext } from "../Context/AuthContext";
import Challenges from "../Pages/Challenges/Challenges";
import QuestionShow from "../Pages/QuestionShow/QuestionShow";
import Certificate from "../Pages/Certificate/Certificate";
import Certificate_Step_1 from "../Pages/Certificate/Certificate_Step_1/Certificate_Step_1";
import TestQuestionShow from "../Pages/TestQuestionShow/TestQuestionShow"; 

const Routing = () => {
  const { validUser } = useContext(authContext);

  return (
    <Routes>
      <Route path="/verification" element={<Verification />} />
      {!validUser && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/purpose" element={<Home />} />
        </>
      )}
      {validUser && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Certificate" element={<Certificate />} />
          <Route path="/Certificate/:certificate_id" element={<Certificate_Step_1 />} />
          <Route path="/Certificate/:certificate_id/:done" element={<TestQuestionShow />} />
          <Route path="/challenges/:languageName" element={<Challenges />} />
          <Route path="/question-show/:languageName/:questionId" element={<QuestionShow />} />
          <Route path="*" element={"Error"} />
        </>
      )}
      {/* <Route
        path="*"
        element={<Navigate to={validUser ? "/dashboard" : "/"} />}
      /> */}
    </Routes>
  );
};

export default Routing;
