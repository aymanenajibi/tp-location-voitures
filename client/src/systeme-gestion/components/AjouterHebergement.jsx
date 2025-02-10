import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHotel } from "../redux/action";  // Import de l'action d'ajout
import { useNavigate } from "react-router-dom";

export default function AjouterHebergements() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newHotel, setNewHotel] = useState({
        IdHotel: "",
        Nom_Hotel: "",
        Description: "",
        Ville: "",
        Images: "",
        Commentaires: [],
        Like: 0,
        Dislike: 0,
    });

    const handleChange = (e) => {
        setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newHotel.IdHotel && newHotel.Nom_Hotel && newHotel.Ville) {
            dispatch(addHotel(newHotel)); // Envoie au Redux Store
            navigate("/hebergements"); // Redirige vers la liste des hébergements
        } else {
            alert("Veuillez remplir tous les champs obligatoires !");
        }
    };

    return (
        <div>
            <h2 style={{textAlign:"center"}}>Ajouter un Hébergement</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="IdHotel" placeholder="ID Hôtel" onChange={handleChange} required />
                <input type="text" name="Nom_Hotel" placeholder="Nom de l'hôtel" onChange={handleChange} required />
                <input type="text" name="Description" placeholder="Description" onChange={handleChange} required />
                <input type="text" name="Ville" placeholder="Ville" onChange={handleChange} required />
                <input type="text" name="Images" placeholder="URL de l'image" onChange={handleChange} required />
                <br /> <br />
                <button type="submit" style={{width:"80px"}}>Ajouter</button>
            </form>
        </div>
    );
}
