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
import Certificate_step_3 from "../Pages/Certificate/Certificate_step_3/Certificate_step_3";
import TestQuestionShow from "../Pages/TestQuestionShow/TestQuestionShow";
import ContestList from "../Pages/Contest/ContestList";
import Contest_Step_1 from "../Pages/Contest/Contest_Step_1/Contest_Step_1";
import JoinVsMode from "../Pages/VsMode/JoinVsMode";
import UserProfile from "../Pages/VsMode/UserProfile";
import ResultPage from "../Pages/VsMode/ResultPage";
import PlaygroundList from "../Pages/Playground/PlaygroundList/PlaygroundList";
import Profile from "../Pages/Profile/Profile";
import Playground from "../Pages/Playground/Playground";

const Routing = () => {
  const { validUser } = useContext(authContext);

  return (
    <Routes>
      <Route path="/verification" element={<Verification />} />
      {!validUser && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
        </>
      )}
      {validUser && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route
            path="/certificate/:certificate_name"
            element={<Certificate_Step_1 />}
          />
          <Route path="/challenges/:languageName" element={<Challenges />} />
          <Route
            path="/question-show/:languageName/:questionId"
            element={<QuestionShow />}
          />
          <Route path="/contest" element={<ContestList />} />
          <Route path="/contest/:name" element={<Contest_Step_1 />} />
          <Route path="/vsmode" element={<JoinVsMode />} />
          <Route
            path="/test-questions-list/:type/:name"
            element={<TestQuestionShow />}
          />
          <Route
            path="/test-questions-list/:type/:name/:join"
            element={<TestQuestionShow />}
          />
          <Route
            path="/certificate-result-msg/:name"
            element={<Certificate_step_3 />}
          />
          <Route
            path="/user-profiles/:languageName/:id"
            element={<UserProfile />}
          />
          <Route path="/user-profiles/:qid" element={<UserProfile />} />
          <Route
            path="/vsmode/result/:who/:id/:mode"
            element={<ResultPage />}
          />
          <Route path="/playground" element={<PlaygroundList />} />
          <Route path="/playground/:id" element={<Playground />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="*" element={"Error"} />
        </>
      )}
    </Routes>
  );
};

export default Routing;
