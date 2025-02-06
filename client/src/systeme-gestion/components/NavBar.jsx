import React from "react";
import { Link } from "react-router-dom";
import '../style/NavBar.css'

export default function NavBar () {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/hebergements">Hébergements</Link></li>
                <li><Link to="/voitures">Voitures de location</Link></li>
            </ul>
        </nav>
    )
};