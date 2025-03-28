import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ListeVoitures from "./components/ListeVoitures";
import Hebergements from "./components/Herbergement";
import DetailsHebergement from "./components/DetailsHebergement";
import "./style/App.css";
import AjouterHebergements from "./components/AjouterHebergement";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/hebergements" element={<Hebergements />} />
          <Route
            path="/detailshebergements/:idHotel"
            element={<DetailsHebergement />}
          />
          <Route path="/voitures" element={<ListeVoitures />} />
          <Route
            path="*"
            element={
              <span>
                <a
                  href="http://localhost:3000/hebergements"
                  style={{
                    color: "red",
                    textAlign: "center",
                    display: "block",
                    fontSize: "3rem",
                  }}
                >
                  👆 Click 👆
                </a>
              </span>
            }
          />
          <Route
            path="/hebergements/AjouterHebergements"
            element={<AjouterHebergements />}
          />
        </Routes>
      </div>
    </Router>
  );
}
