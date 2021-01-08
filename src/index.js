/*
 * @Author: xuwei
 * @Date: 2021-01-08 10:20:08
 * @LastEditTime: 2021-01-08 11:23:41
 * @LastEditors: xuwei
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import App from "./Test/slide";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
