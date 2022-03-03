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
  
  return (
    <>
      <div className="skills-container">
        <p>Get Your Skills Certified</p>
        <div className="skills-container-grid">
          {Object.keys(certificateList).map((id) => {
            return (
              <Link key={id} to={`/certificate/${id}`} className="router-links">
                <CertificationCard
                  certificateIcon={certificateList[id].certificate_icon_path}
                  skillTitle={certificateList[id].certificate_name}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Certificate;
