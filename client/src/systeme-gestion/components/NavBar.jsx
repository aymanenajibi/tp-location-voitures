import React from "react";
import { NavLink } from "react-router-dom"; // Utilisez NavLink pour le style actif
import "../style/NavBar.css";

export default function NavBar() {
    return (
    //* Partie du examen navbar avec link simple 
    /*
    ? return (
    *    <nav className="navbar">
    *        <ul>
    *            <li>
    *                <Link to="/hebergements">Hébergements</Link>
    *            </li>
    *            <li>
    *                <Link to="/hebergements/h1">Hébergement spécifique (h1)</Link>
    *            </li>
    *            <li>
    *                <Link to="/voitures">Voitures de location</Link>
    *            </li>
    *            <li>
    *                <Link to="/hebergements/x/y">Page d’erreur</Link>
    *            </li>
    *        </ul>
    *    </nav>
    ? );
     */

    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/hebergements" activeClassName="active">
            Hébergements
          </NavLink>
        </li>
        <li>
          <NavLink to="/hebergements/h1" activeClassName="active">
            Hébergement spécifique (h1)
          </NavLink>
        </li>
        <li>
          <NavLink to="/voitures" activeClassName="active">
            Voitures de location
          </NavLink>
        </li>
        <li>
          <NavLink to="/hebergements/x/y" activeClassName="active">
            Page d’erreur
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
