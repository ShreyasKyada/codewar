import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState } from "react";
import { auth } from "../Firebase/Firebase";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const [validUser, setValidUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user === null) {
      setValidUser(false);
    } else {
      setValidUser(true);
    }
    // console.log("state change", user);
  });

  return (
    <authContext.Provider
      value={{ validUser, setValidUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
