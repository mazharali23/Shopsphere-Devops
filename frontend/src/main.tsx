import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./style.css";

import { store } from "./redux/store";
import { App } from "./App";
import { meThunk } from "./redux/slices/authSlice";

if (localStorage.getItem("accessToken")) {
  store.dispatch(meThunk());
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

