import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment, addLike } from "../redux/action";
import "../style/Hebergements.css"; // Importation des styles
import DetailsHebergement from "./DetailsHebergement"; // Importation du composant DetailsHebergement

export default function Hebergements() {
  const hotels = useSelector((state) => state.db); // Récupère les hôtels depuis le Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(""); // État pour la recherche par ville
  const [showForm, setShowForm] = useState(null); // Gère l'affichage du formulaire
  const [comment, setComment] = useState(""); // État pour le commentaire

  // Filtrage des hôtels par ville
  const filteredHotels = hotels.filter((hotel) =>
    hotel.Ville.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hebergements-container">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par ville..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Affichage des hébergements */}
      {filteredHotels.length > 0 ? (
        filteredHotels.map((hotel) => (
          <div key={hotel.IdHotel} className="hebergement-card">
          <h3>{hotel.Nom_Hotel}</h3>
            <img
              // src={`/images/${hotel.Images}`}
              src={hotel.Images}
              alt={hotel.Nom_Hotel}
              onClick={() => navigate(`/hebergements/${hotel.IdHotel}`)} // Redirection vers les détails
            />
            <p>{hotel.Description}</p>
            <p>
              <strong>Ville:</strong> {hotel.Ville}
            </p>
            <p>
              <strong>Likes:</strong> {hotel.Like}
            </p>

            {/* Bouton Like */}
            <button onClick={() => dispatch(addLike(hotel.IdHotel))}>
              👍 Like
            </button>

            {/* Bouton pour afficher le formulaire d'ajout de commentaire */}
            <button onClick={() => setShowForm(hotel.IdHotel)}>💬 +AjouterComment</button>

            {/* Formulaire d'ajout de commentaire */}
            {showForm === hotel.IdHotel && (
              <div className="comment-form">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ajoutez un commentaire"
                />
                <button
                  onClick={() => {
                    dispatch(addComment(hotel.IdHotel, comment));
                    setComment(""); // Réinitialiser le champ après ajout
                  }}
                >
                  ➕ Ajouter
                </button>
              </div>
            )}

            {/* Affichage des détails de l'hébergement */}

            <ul>
              <DetailsHebergement com={hotel.Commentaires} />
            </ul>
          </div>
        ))
      ) : (
        <p className="no-result">
          ❌ Aucun hébergement disponible dans la ville saisie.
        </p>
      )}
    </div>
  );
}
