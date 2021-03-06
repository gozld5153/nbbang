import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyles from "./style/GlobalStyles";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <>
    <CookiesProvider>
        <GlobalStyles />
        <App />
    </CookiesProvider>
  </>,
  document.getElementById("root")
);