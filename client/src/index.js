import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import correct pour React 18
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./efm-fes-meknes/App";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Utilisation de createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
