import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import "./PlaygroundList.css";
import { Link, useNavigate } from "react-router-dom";
import appRef, { auth } from "../../../Firebase/Firebase";
import { loginContext } from "../../../Context/LoginContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const PlaygroundList = () => {
  const [playgroundCardList, setPlaygroundCardList] = useState({});
  const navigate = useNavigate();
  const { setIsLoadingState, setActiveTab } = useContext(loginContext);
  const [isOpenDialogBox, setIsOpenDialogBox] = useState(false);
  const [isOpenDialogBoxShare, setIsOpenDialogBoxShare] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isAgreeState, setIsAgreeState] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    document.title = `Playground | CodeWar`;
    setActiveTab("Playground");
    if (playgroundCardList) {
      setIsLoadingState(true);
      appRef
        .child(`users_info/${auth.currentUser.uid}/playground`)
        .on("value", (snapshot) => {
          setPlaygroundCardList(snapshot.val());
          setIsLoadingState(false);
        });
    }
  }, []);

  const playgroundEdit = (id) => {
    navigate(`/playground/${id}`);
  };

  const handleDialogBoxClose = () => {
    setIsOpenDialogBox(false);
  };

  useEffect(async () => {
    if (isAgreeState && deleteId) {
      // console.log("Delete id", deleteId);
      await appRef
        .child(`/users_info/${auth.currentUser.uid}/playground/${deleteId}`)
        .remove();
      setIsOpenDialogBox(false);
      setIsAgreeState(false);
    }
  }, [isAgreeState]);

  const agreeBtnClick = () => {
    setIsAgreeState(true);
  };

  const playgroundShare = (id) => {
    setIsOpenDialogBoxShare(true);
    setShareLink(`${window.location.href}/${id}`);
  };

  const handleDialogBoxShareClose = () => {
    setIsOpenDialogBoxShare(false);
  };

  return (
    <div className="playgroundlist-container">
      <Dialog
        open={isOpenDialogBox}
        onClose={handleDialogBoxClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit the test??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogBoxClose} className="agree-btn">
            No
          </Button>
          <Button onClick={agreeBtnClick} className="agree-btn">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpenDialogBoxShare}
        onClose={handleDialogBoxShareClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {shareLink}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="playgroundlist-sub-container">
        <div className="playground-title">
          <img src="https://firebasestorage.googleapis.com/v0/b/codewar-project-2022.appspot.com/o/Logo.svg?alt=media&token=6d889c90-3c92-4f71-860a-f94ddf636275" />
          <h3 className="playground-heading">CodeWar PLAYGROUND</h3>
          <p className="playground-other-text">Compile. Run. Debug.</p>
        </div>
        <div className="compile-run-debug">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="add-playground-btn"
            component={Link}
            to="/playground/empty"
          >
            New Playground
          </Button>
        </div>

        <div className="playground-list-container">
          {playgroundCardList ? (
            Object.keys(playgroundCardList).map((id) => {
              return (
                <div className="playground-list-card" key={id}>
                  <div className="playground-list-heading">
                    <p className="symbol">{`>_`}</p>
                    <p className="playground-card-heading">
                      {playgroundCardList[id].playgroundName}
                    </p>
                  </div>

                  <div className="playground-icons">
                    <DeleteIcon
                      className="playground-icon"
                      onClick={() => {
                        setDeleteId(id);
                        setIsOpenDialogBox(true);
                      }}
                    />
                    <EditIcon
                      className="playground-icon"
                      onClick={() => playgroundEdit(id)}
                    />
                    <ShareIcon
                      className="playground-icon"
                      onClick={() => playgroundShare(id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h3 style={{ textAlign: "center", width: "100%" }}>
              Oh..no!! Nothing to show
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundList;
