import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ListeVoitures from "./components/ListeVoitures.jsx";
import { Herbergement } from "./components/Herbergement.jsx";
import { Home } from "./components/Home.jsx";
import "./style/App.css";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<NavBar />} />
                <Route index element={<Home />} />
                <Route path="hebergements" element={<Herbergement />} />
                <Route path="voitures" element={<ListeVoitures />} />
            </Routes>
        </BrowserRouter>
    );
}