import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import appRef, { auth } from "../Firebase/Firebase";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const [validUser, setValidUser] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if(validUser) {
      appRef.child(`users_info/${auth.currentUser.uid}/score`).on("value",(snapshot) => {
        setScore(snapshot.val());
      })
    }
  }, [validUser]);

  onAuthStateChanged(auth, (user) => {
    if (user === null) {
      setValidUser(false);
    } else {
      setValidUser(true);
    }
  });

  return (
    <authContext.Provider value={{ validUser, setValidUser, score }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
