import React, { useContext, useEffect } from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import "./ContestList.css";
import { Checkbox, FormControlLabel, Skeleton } from "@mui/material";
import ContestListLogic from "./ContestListLogic";
import { loginContext } from "../../Context/LoginContext";
import SubHeader from "../../Components/SubHeader/SubHeader";

const ContestList = () => {
  const { activeContestList, archiveContestList, isSkeletonLoading } =
    ContestListLogic();
  const { setActiveTab, setIsShowNavbar } = useContext(loginContext);

  useEffect(() => {
    setActiveTab("Contest");
    setIsShowNavbar(true);
  }, []);

  return (
    <>
      <SubHeader
        subHeaderNevigationLink={{
          Dashboard: {
            name: "Contest",
            link: "/contest",
          },
        }}
      />
      <div className="contest-list-container">
        {isSkeletonLoading ? (
          <div className="contest-list-card-container">
            <h1 className="contest-heading">Active Contest</h1>
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="contest-card-container"
              height={100}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="contest-card-container"
              height={100}
            />
            <h1 className="contest-heading">Archived Contest</h1>
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="contest-card-container"
              height={100}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              className="contest-card-container"
              height={100}
            />
          </div>
        ) : (
          <div className="contest-list-card-container">
            <h1 className="contest-heading">Active Contest</h1>
            {activeContestList ? (
              Object.keys(activeContestList)
                .map((id) => {
                  return <ContestCard key={id} data={activeContestList[id]}/>;
                })
                .reverse()
            ) : (
              <h5 className="error-msg">No active contest.</h5>

            )}

            <h1 className="contest-heading">Archived Contest</h1>
            {archiveContestList ? (
              Object.keys(archiveContestList)
                .map((id) => {
                  return <ContestCard key={id} data={activeContestList[id]} />;
                })
                .reverse()
            ) : (
              <h5 className="error-msg">No archived contest.</h5>
            )}
          </div>
        )}
        <div className="filter-container">
          <div className="skill-container filters">
            <p className="skill-lable">FILTER</p>
            <div>
              <FormControlLabel
                control={<Checkbox className="check-box" />}
                label="C++"
                className="check-box"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox className="check-box" />}
                label="Java"
                className="check-box"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestList;
