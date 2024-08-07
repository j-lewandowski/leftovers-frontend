import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { HttpService } from "./query-client-provider";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HttpService>
        <Router />
      </HttpService>
    </ThemeProvider>
  </React.StrictMode>
);
