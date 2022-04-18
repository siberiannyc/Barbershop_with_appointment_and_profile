import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/loader.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
require("dotenv").config();

console.log(process.env);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
