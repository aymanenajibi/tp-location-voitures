import React from "react";
import ReactDOM from "react-dom/client"; // Import correct pour React 18
import { Provider } from "react-redux";
import hotelStore from "./systeme-gestion/redux/HotelStore";
import "./systeme-gestion/style/App.css";
import App from "./systeme-gestion/App";

// Création de la root avec createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={hotelStore}>
        <App />
    </Provider>
);
