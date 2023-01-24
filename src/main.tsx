import React from "react";
import ReactDOM from "react-dom/client";
import SquareEquationApp from "./SquareEquationApp";

// Utils
import "./utils/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SquareEquationApp />
  </React.StrictMode>
);
