import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import enUSA from "antd/locale/en_US";
// import i18n (needs to be bundled ;))
import "./i18n";
import Cookies from "js-cookie";
import { JalaliLocaleListener } from "antd-jalali";

const queryClient = new QueryClient();
const getLang = Cookies.get("language") === "en" ? enUSA : faIR;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={getLang}>
        <QueryClientProvider client={queryClient}>
          <JalaliLocaleListener />
          <App />
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
