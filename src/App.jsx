import React from "react";
import Header from "./Components/Header/Header";
import Routing from "./Components/Routing";
import AuthContext from "./Context/AuthContext";
import LoginContext from "./Context/LoginContext";
import ThemeContext from "./Context/ThemeContext";

const App = () => {
  return (
    <>
      <AuthContext>
        <LoginContext>
          <ThemeContext>
            <Header />
            <Routing />
          </ThemeContext>
        </LoginContext>
      </AuthContext>
    </>
  );
};

export default App;
