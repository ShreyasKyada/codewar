import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../Context/LoginContext";
import appRef from "../../Firebase/Firebase";

const JoinVsModeLogic = () => {
  const txtbox_1 = useRef();
  const txtbox_2 = useRef();
  const txtbox_3 = useRef();
  const txtbox_4 = useRef();
  const [inputboxValue, setInputboxValue] = useState(["", "", "", ""]);
  const { setSnackbarData } = useContext(loginContext);
  const navigate = useNavigate();

  const txtboxOnchangeHalder = (event) => {
    let tempInputboxValue = inputboxValue;
    if (event.target.name === "txtbox_1") {
      tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] =
        event.target.value;
      if (
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] !== ""
      )
        txtbox_2.current.focus();
    } else if (event.target.name === "txtbox_2") {
      tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] =
        event.target.value;

      if (
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] !== ""
      )
        txtbox_3.current.focus();
    } else if (event.target.name === "txtbox_3") {
      tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] =
        event.target.value;
      if (
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] !== ""
      )
        txtbox_4.current.focus();
    } else {
      tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] =
        event.target.value;
    }
    setInputboxValue(Object.values(tempInputboxValue));
  };

  const txtboxKeyDown = (event) => {
    let tempInputboxValue = inputboxValue;

    if (event.target.name === "txtbox_2") {
      if (
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] ===
          "" &&
        event.code === "Backspace"
      ) {
        txtbox_1.current.focus();
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] = "";
      }
    } else if (event.target.name === "txtbox_3") {
      if (
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] ===
          "" &&
        event.code === "Backspace"
      ) {
        txtbox_2.current.focus();
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] = "";
      }
    } else if (event.target.name === "txtbox_4") {
      if (
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] ===
          "" &&
        event.code === "Backspace"
      ) {
        txtbox_3.current.focus();
        tempInputboxValue[parseInt(event.target.name.split("_")[1]) - 1] = "";
      }
    }
  };

  const joinBtnHandler = () => {
    const questionId =
      inputboxValue[0] + inputboxValue[1] + inputboxValue[2] + inputboxValue[3];

    if (questionId.length === 4) {
      appRef
        .child("/vs_mode")
        .orderByChild("random_number")
        .equalTo(questionId)
        .on("child_added", (snapshot) => {
          const snap = snapshot.val();

          if (snap === null) {
            setSnackbarData("Invalid question id", "error");
          } else {
            navigate("/user-profiles/" + questionId);
          }
        });
    } else {
      setSnackbarData("Invalid question id", "error");
    }
  };

  return {
    txtbox_1,
    txtbox_2,
    txtbox_3,
    txtbox_4,
    txtboxOnchangeHalder,
    txtboxKeyDown,
    inputboxValue,
    joinBtnHandler,
  };
};

export default JoinVsModeLogic;
