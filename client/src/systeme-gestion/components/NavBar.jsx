import React from "react";
import { Link } from "react-router-dom"; // Supprimez BrowserRouter, Routes, Route
import "../style/NavBar.css";

export default function NavBar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/hebergements">Hébergements</Link>
                </li>
                <li>
                    <Link to="/hebergements/h1">Hébergement spécifique (h1)</Link>
                </li>
                <li>
                    <Link to="/voitures">Voitures de location</Link>
                </li>
                <li>
                    <Link to="/hebergements/x/y">Page d’erreur</Link>
                </li>
            </ul>
        </nav>
    );
}