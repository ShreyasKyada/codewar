import React from "react";
import { Link } from "react-router-dom";
import CertificationCard from "../../Components/CertificationCard/CertificationCard";
import LanguageCard from "../../Components/LanguageCard/LanguageCard";
import SubHeader from "../../Components/SubHeader/SubHeader";
import "./Dashboard.css";
import DashboardLogic from "./DashboardLogic";

const Dashboard = () => {
  const { allLanguages } = DashboardLogic();

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          Dashboard: {
            name: "Dashboard",
            link: "/dashboard",
          }
        }}
      />
      <div className="dashboard-container">
        {/* <h1 className="dashboard-heading">Dashboard</h1> */}
        <p className="certificate-heading">Get Your Skills Certified</p>
        <div className="certification-card-container">
          <CertificationCard
            certificateIcon={
              "https://hrcdn.net/s3_pub/hr-assets/dashboard/ProblemSolving.svg"
            }
            skillTitle="Provlem Solving"
          />
          <CertificationCard
            certificateIcon={
              "https://hrcdn.net/s3_pub/hr-assets/dashboard/Python.svg"
            }
            skillTitle="Python"
          />
          <CertificationCard skillTitle="Other Skills" />
        </div>

        <div className="language-container">
          <h5>Prepare By Topics</h5>
          <div className="language-list">
            {Object.keys(allLanguages).map((id) => {
              return allLanguages[id].language_name ? (
                <div className="language-card-container" key={id}>
                  <Link
                    className="router-links"
                    to={`/challenges/${allLanguages[id].language_name}`}
                    // to={'/challenges/c'}
                  >
                    <LanguageCard
                      iconURL={allLanguages[id].icon_path}
                      languageName={allLanguages[id].language_name}
                    />
                  </Link>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
