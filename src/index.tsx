import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { LOCALSTORAGE_URLLIST } from "./constants";

const initLocalStorage = () => {
  if (localStorage.getItem(LOCALSTORAGE_URLLIST) === null) {
    const baseUrl = "https://hosted.mickgeorge.co.uk/businessportal/";
    localStorage.setItem(LOCALSTORAGE_URLLIST, JSON.stringify([baseUrl]));
  }
};

initLocalStorage();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
