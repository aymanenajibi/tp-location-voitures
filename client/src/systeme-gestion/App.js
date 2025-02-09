import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ListeVoitures from "./components/ListeVoitures";
import Hebergements from "./components/Herbergement";
import "./style/App.css";

export default function App() {
    return (
        <Router>
            <NavBar />
            <div className="app-container">
                <Routes>
                    <Route path="/hebergements" element={<Hebergements />} />
                    <Route path="/hebergements/:idHotel" element={<Hebergements />} />
                    <Route path="/voitures" element={<ListeVoitures />} />
                    <Route path="*" element={<h2>Page non trouvée</h2>} />
                </Routes>
            </div>
        </Router>
    );
}