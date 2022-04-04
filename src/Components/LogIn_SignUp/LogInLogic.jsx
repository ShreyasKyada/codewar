import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../Context/LoginContext";
import { createAnAccount, login } from "../../Firebase/Authentication";

const LoginLogic = () => {
  //Hooks
  const [tabValue, setTabValue] = useState("0");
  const [height, setHeight] = useState("120%");
  const { showLogin, setShowLogin, setIsLoadingState, isLoadingState } =
    useContext(loginContext);
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const signUpDataFun = (event) => {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  const handleChange = (event, val) => {
    setTabValue(val);
  };

  useEffect(() => {
    if (showLogin) {
      setHeight("100%");
    }
  }, [showLogin]);

  const signUpBtnFun = async () => {
    const { username, email, password } = signUpData;

    /*
    Do some validation like username, email and password is not empty fields and email 
    must be in valid format and then password must be at least 6 characters long.
    */
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      // Please fill the data first
      setShowSnackbar(true);
      setErrorText("Please fill the data first");
    } else {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        //email is not valid
        setShowSnackbar(true);
        setErrorText("Email is not valid");
      } else {
        if (password.length < 6) {
          // password is too short (exeption)
          setShowSnackbar(true);
          setErrorText("password is too short");
        } else {
          /* 
            Now send the data into a nodejs app which name is codewar_backend 
            and then codewar_backend will send one verification mail into given
            mail id.
          */
          setIsLoadingState(true);
          const catchErr = await createAnAccount(signUpData);
          setIsLoadingState(false);

          if (catchErr !== "none") {
            setShowSnackbar(true);
            setErrorText(catchErr);
          } else {
            setShowLogin(false);
          }
        }
      }
    }
  };

  const hideSnackbar = () => {
    setShowSnackbar(false);
  };

  const getLoginData = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const loginFun = () => {
    setIsLoadingState(true);
    let error = login(loginData);
    setIsLoadingState(false);
    error.then((res) => {
      if (res === "none") {
        setShowLogin(false);
      } else {
        if (res.code === "auth/wrong-password") {
          setShowSnackbar(true);
          setErrorText("Wrong password");
        } else if (res.code === "auth/user-not-found") {
          setShowSnackbar(true);
          setErrorText("Email is not found");
        }
      }
    });
  };

  return {
    tabValue,
    handleChange,
    height,
    signUpDataFun,
    signUpBtnFun,
    errorText,
    showSnackbar,
    setShowSnackbar,
    hideSnackbar,
    loginFun,
    getLoginData,
    isLoadingState
  };
};

export default LoginLogic;
