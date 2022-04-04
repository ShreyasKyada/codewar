import { Skeleton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CertificationCard from "../../Components/CertificationCard/CertificationCard";
import LanguageCard from "../../Components/LanguageCard/LanguageCard";
import SubHeader from "../../Components/SubHeader/SubHeader";
import { loginContext } from "../../Context/LoginContext";
import "./Dashboard.css";
import DashboardLogic from "./DashboardLogic";

const Dashboard = () => {
  const {
    allLanguages,
    isLanguageSkeleton,
    isCertificateSkeleton,
    twoCertificate,
  } = DashboardLogic();
  const { setActiveTab, setIsShowNavbar } = useContext(loginContext);

  document.title = "Dashboard | CodeWar";

  useEffect(() => {
    setActiveTab("Dashboard");
    setIsShowNavbar(true);
  }, []);

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          Dashboard: {
            name: "Dashboard",
            link: "/dashboard",
          },
        }}
      />
      <div className="dashboard-container">
        <p className="dashboard-certificate-heading">Get Your Skills Certified</p>
        <div className="certification-card-container">
          {isCertificateSkeleton ? (
            <>
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="language-card-container"
                height={170}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="language-card-container"
                height={170}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                className="language-card-container"
                height={170}
              />
            </>
          ) : (
            <>
              {twoCertificate ? (
                Object.keys(twoCertificate).map((id) => {
                  return (
                    <CertificationCard
                      key={id}
                      certificateIcon={twoCertificate[id].certificate_icon_path}
                      skillTitle={twoCertificate[id].certificate_name}
                    />
                  );
                })
              ) : (
                <h5 className="error-msg">Ohh..Noo!! Nothing to show.</h5>
              )}
              <Link to="/certificate" className="router-links">
                <CertificationCard skillTitle="Other Skills" />
              </Link>
            </>
          )}
        </div>

        <div className="language-container">
          <h5>Prepare By Topics</h5>
          {isLanguageSkeleton ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="language-card-container"
              height={150}
            />
          ) : (
            <div className="language-list">
              {allLanguages ? (
                Object.keys(allLanguages).map((id) => {
                  return (
                    <div className="language-card-container" key={id}>
                      <Link
                        className="router-links"
                        to={`/challenges/${allLanguages[id].language_name}`}
                      >
                        <LanguageCard
                          iconURL={allLanguages[id].icon_path}
                          languageName={allLanguages[id].language_name}
                        />
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h5 className="error-msg">Ohh..Noo!! Nothing to show.</h5>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
