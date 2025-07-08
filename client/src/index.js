import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { DataProvider } from "./context/DataContext";
import store from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <BrowserRouter>
      <Provider store={store}>
        <DataProvider>
          <App />
        </DataProvider>
      </Provider>
    </BrowserRouter>
);
