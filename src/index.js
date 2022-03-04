import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./Theme/index.css";
import './Theme/Fireflies.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <div className="firefly"></div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
