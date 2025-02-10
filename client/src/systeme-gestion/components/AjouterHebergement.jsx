import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHotel } from "../redux/action"; // Import de l'action d'ajout
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
    Commentaires: "",
    Like: "",
    Dislike: "",
  });

  const handleChange = (e) => {
    /*
     *    setNewHotel((prev) => ({
     *        ...prev,
     *        [e.target.name]:
     *        e.target.name === "Like" || e.target.name === "Dislike"
     *            ? Number(e.target.value)
     *            : e.target.value,
     *    }));
     */
    const { name, value } = e.target;
    setNewHotel((prev) => ({
      ...prev,
      [e.target.name]:
        name === "Like" || name === "Dislike" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newHotel.IdHotel && newHotel.Nom_Hotel && newHotel.Ville) {
      const formattedHotel = {
        ...newHotel,
        Commentaires: newHotel.Commentaires
          ? newHotel.Commentaires.split(",")
          : [],
      };

      dispatch(addHotel(formattedHotel)); //* Envoie au Redux Store
      navigate("/hebergements"); //* Redirige vers la liste des hébergements

      // Réinitialiser le formulaire
      setNewHotel({
        IdHotel: "",
        Nom_Hotel: "",
        Description: "",
        Ville: "",
        Images: "",
        Commentaires: "",
        Like: 0,
        Dislike: 0,
      });
    } else {
      alert("Veuillez remplir tous les champs obligatoires !");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Ajouter un Hébergement</h2>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="IdHotel"
            placeholder="ID Hôtel"
            value={newHotel.IdHotel}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="Nom_Hotel"
            placeholder="Nom de l'hôtel"
            value={newHotel.Nom_Hotel}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="Description"
            placeholder="Description"
            value={newHotel.Description}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="Ville"
            placeholder="Ville"
            value={newHotel.Ville}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="Images"
            placeholder="URL de l'image"
            value={newHotel.Images}
            onChange={handleChange}
            required
        />
        <textarea
            name="Commentaires"
            placeholder="Commentaires (séparés par des virgules)"
            value={newHotel.Commentaires}
            onChange={handleChange}
        ></textarea>
        <input
            type="number"
            name="Like"
            placeholder="Like"
            value={newHotel.Like}
            onChange={handleChange}
            required
        />
        <input
            type="number"
            name="Dislike"
            placeholder="Dislike"
            value={newHotel.Dislike}
            onChange={handleChange}
            required
        />
        <br /> <br />
        <button type="submit" style={{ width: "80px" }}>
          Ajouter
        </button>
      </form>
    </div>
  );
}
