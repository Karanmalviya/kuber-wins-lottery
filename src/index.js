import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./app/store";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <Toaster />
          <App />
        </Provider>
      </StyledEngineProvider>
    </React.StrictMode>
  </BrowserRouter>
);
