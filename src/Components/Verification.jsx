import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import appRef from "../Firebase/Firebase";

const Verification = () => {
  /*
    -> We have 2 modes: 
        1.normal mode
        2.verification mode
    */
  const mode = new URLSearchParams(useLocation().search).get("mode");
  const uid = new URLSearchParams(useLocation().search).get("uid");
  const navigate = useNavigate();

  if (mode === "verification") {
    appRef
      .child(`user_verification_status/${uid}`)
      .set({ verification_status: true }, () => {
        navigate("/dashboard");
      });
  }

  return (
    <>
      {mode === "normal" ? (
        <div>
          <p>You need to verify your email.</p>
          <p>Please check the mail on provided email address.</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Verification;
