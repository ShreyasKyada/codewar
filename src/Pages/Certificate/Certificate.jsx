import React, { useContext, useEffect } from "react";
import "./Certificate.css";
import CertificationCard from "../../Components/CertificationCard/CertificationCard";
import CertificateLogic from "./CertificateLogic";
import { Link } from "react-router-dom";
import { loginContext } from "../../Context/LoginContext";

const Certificate = () => {
  const { certificateList } = CertificateLogic();
  const { setActiveTab } = useContext(loginContext);

  useEffect(() => {
    setActiveTab("Certify");
  }, []);

  document.title = "Certifify | CodeWar";

  return (
    <>
      <div className="skills-container">
        <p>Get Your Skills Certified</p>
        <div className="skills-container-grid">
          {certificateList ? (
            Object.keys(certificateList).map((id) => {
              return (
                <Link
                  key={id}
                  to={`/certificate/${certificateList[id].certificate_name}`}
                  className="router-links"
                >
                  <CertificationCard
                    certificateIcon={certificateList[id].certificate_icon_path}
                    skillTitle={certificateList[id].certificate_name}
                  />
                </Link>
              );
            }).reverse()
          ) : (
            <h5 className="error-msg">Ohh..Noo!! Nothing to show.</h5>
          )}
        </div>
      </div>
    </>
  );
};

export default Certificate;
