import React, { useContext, useEffect } from "react";
import "./ResultPage.css";
import sad from "../../Assets/Sad.png";
import happy from "../../Assets/happy.png";
import { useParams } from "react-router-dom";
import { loginContext } from "../../Context/LoginContext";
import appRef from "../../Firebase/Firebase";

const ResultPage = () => {
  const {  mode, id } = useParams();
  const { setIsShowNavbar } = useContext(loginContext);

  document.title = `Result | CodeWar`;

  useEffect(() => {
    setIsShowNavbar(true);
    appRef.child(`/vs_mode/${id}`).remove();
  }, []);

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="sad-img">
          {mode === "win" ? (
            <img src={happy} alt="" />
          ) : (
            <img src={sad} alt="" />
          )}
        </div>
        {mode === "win" ? (
          <>
            <h2 className="green">Congratulations..!!</h2>
            <p>You won this challange.</p>
            <p>Try next challanges with your friend.</p>{" "}
          </>
        ) : (
          <>
            <h2 className="red">Oh..no..!!</h2>
            <p>You loss this challange.</p>
            <p>Better luck next time.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
