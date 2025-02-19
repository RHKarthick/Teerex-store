import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TrexContext from "./context/TrexContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <TrexContext>
      <App />
    </TrexContext>
  // </React.StrictMode>
);
