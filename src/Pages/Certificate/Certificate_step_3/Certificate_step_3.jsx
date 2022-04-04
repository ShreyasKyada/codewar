import React, { useContext, useEffect } from "react";
import "./Certificate_step_3.css";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import certificateVector from "../../../Assets/join-vector.svg";
import { loginContext } from "../../../Context/LoginContext";
import SubHeader from "../../../Components/SubHeader/SubHeader";
import { useParams } from "react-router-dom";

const Certificate_step_3 = () => {
  const { setActiveTab, setIsShowNavbar } = useContext(loginContext);
  const { name } = useParams();

  useEffect(() => {
    setActiveTab("Certificate");
    setIsShowNavbar(true);
  }, []);

  document.title = `Certifify | CodeWar`;

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          certificate: {
            name: "Certify",
            link: "/certificate",
          },
          name1: {
            name: name,
            link: "",
          },
        }}
      />

      <div>
        <div className="container">
          <h3 className="heading-result">
            <IoCheckmarkDoneCircleSharp className="done-icon" /> Test Submitted
            Successfully!!
          </h3>

          <div className="result-bottom-container">
            <img src={certificateVector} className="img"></img>
            <br />
            <p className="result-message">
              <span>
                We are evaluating your submitted code. We will send you an email
                when your results are ready.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate_step_3;
