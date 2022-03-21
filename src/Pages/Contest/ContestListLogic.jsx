import { useState, useEffect, useContext } from "react";
import { loginContext } from "../../Context/LoginContext";
import appRef from "../../Firebase/Firebase";

const ContestListLogic = () => {
  const [activeContestList, setActiveContestList] = useState({});
  const [archiveContestList, setArchiveContestList] = useState({});
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const { setIsLoadingState } = useContext(loginContext);

  useEffect(() => {
    setIsLoadingState(true);
    let cleanUp = true;

    if (cleanUp) {
      appRef
        .child("contest")
        .orderByChild("isActiveState")
        .equalTo(true)
        .on("value", (snap) => {
          if (cleanUp) setActiveContestList(snap.val());
          setIsSkeletonLoading(false);
          setIsLoadingState(false);
        });
      appRef
        .child("contest")
        .orderByChild("isActiveState")
        .equalTo(false)
        .on("value", (snap) => {
          if (cleanUp) setArchiveContestList(snap.val());
          setIsSkeletonLoading(false);
          setIsLoadingState(false);
        });
    }

    return () => (cleanUp = false);
  }, []);

  return {
    activeContestList,
    archiveContestList,isSkeletonLoading
  };
};

export default ContestListLogic;
