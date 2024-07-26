import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
