import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/DetailsHebergement.css"; // Importez le fichier CSS

export default function DetailsHebergement() {
  const { idHotel } = useParams();
  const hotel = useSelector((state) =>
    state.db.find((h) => h.IdHotel === idHotel)
  );

  // Si on est sur la page de détails et qu'on a un hôtel valide.
  if (!hotel) {
    return <h2>Hébergement non trouvé.</h2>;
  }

  return (
    <div className="details-container">
      <h2>{hotel.Nom_Hotel}</h2>
      <img src={hotel.Images} alt={hotel.Nom_Hotel} />
      <p>
        <strong>Description :</strong>
        {hotel.Description}
      </p>
      <p>
        <strong>Ville :</strong>
        {hotel.Ville}
      </p>
      <p>
        <strong>Likes :</strong>
        {hotel.Like}
      </p>
      <p>
        <strong>Commentaires :</strong>
      </p>
      <ul>
        {hotel.Commentaires.length > 0 ? (
          hotel.Commentaires.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))
        ) : (
          <li>Aucun commentaire</li>
        )}
      </ul>
    </div>
  );
}
