import { useState, useEffect, useContext } from "react";
import { loginContext } from "../../Context/LoginContext";
import appRef from "../../Firebase/Firebase";

const ContestListLogic = () => {
  const [activeContestList, setActiveContestList] = useState({});
  const [archiveContestList, setArchiveContestList] = useState({});
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [allFilterName, setallFilterName] = useState([]);
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
      appRef.child("contest").on("value", (snapshot) => {
        const snap = snapshot.val();
        let tempArr = [];
        Object.values(snap).forEach((val) => {
          tempArr.push(val.contest_type);
        });

        tempArr = tempArr.filter((val, index) => {
          return tempArr.indexOf(val) === index;
        });

        setallFilterName(tempArr);
        setIsSkeletonLoading(false);
        setIsLoadingState(false);
      });
    }

    return () => (cleanUp = false);
  }, []);

  const contestCheckboxChangeHandler = async () => {
    const tempFilterArr = [];
    for (let i = 0; i <allFilterName.length; i++) {
      tempFilterArr.push(
        document.getElementsByName(allFilterName[i])[0].checked
      );
    }
    let activeData = null;
    let archiveData = null;
    for (let i = 0; i <allFilterName.length; i++) {
      if (tempFilterArr[i]) {
        await appRef
          .child("contest")
          .orderByChild("contest_type")
          .equalTo(allFilterName[i])
          .get()
          .then((snapshot) => {
            const snap = snapshot.val();
            Object.keys(snap).forEach((id) => {
              if (snap[id].isActiveState) {
                activeData = { ...activeData, [id]: snap[id] };
              } else archiveData = { ...archiveData, [id]: snap[id] };
            });
          });
      }
    }
    setActiveContestList(activeData);
    setArchiveContestList(archiveData);
  };

  return {
    activeContestList,
    archiveContestList,
    isSkeletonLoading,
    allFilterName,
    contestCheckboxChangeHandler,
  };
};

export default ContestListLogic;
