//TODO ---  Composant qui initialise le state a partie de l'api --- 

    /* 
        * ✅ useState → Permet de gérer l’état des voitures.
        * ✅ useEffect → Exécute du code quand le composant est monté (pour récupérer les voitures depuis l'API).
        * ✅ Voiture → Composant qui affiche une voiture sous forme de ligne dans un tableau.
        * ✅ AjouterVoiture → Composant pour ajouter une voiture.
    */

import React, { useState , useEffect } from "react";
import Voiture from "./Voiture";
import AjouterVoiture from "./AjouterVoiture";




export default function ListeVoitures() { 
    const [voitures, setVoitures] = useState([]);
    
    
    /* 
       * ✅ fetch("http://localhost:5000/voitures") → Envoie une requête HTTP pour récupérer la liste des voitures.
       * ✅ response.json() → Convertit la réponse de l’API en format JSON.
       * ✅ setVoitures(data.voitures) → Met à jour l’état voitures avec les données reçues. 
    */
    useEffect(() => {
        fetch("https://api-htb9.vercel.app/voitures")
            .then(response => response.json())
            .then(data => {
                console.log("Données reçues:", data.voitures); // Vérification
                setVoitures(data.voitures);
            })
            .catch(error => console.error("Erreur lors du chargement des voitures :", error));
    }, []);
    
    

    /* 
        * ✅ window.confirm(...) → Affiche une boîte de confirmation avant la suppression.
        * ✅ .filter(...) → Crée une nouvelle liste sans la voiture sélectionnée.
        * 🔥 Supprimer une voiture via API
    */
    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cete voiture ? ")) {
            fetch(`https://api-htb9.vercel.app/voitures/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    setVoitures(voitures.filter((voiture) => voiture.id !== id)); //* ✅ Supprime la voiture de la liste
                })
                .catch(error => console.error("Erreur lors de la suppression de la voiture :", error));
        }
    };
    

    /*   
        * ✅ handleAjout(nouvelleVoiture) → Ajoute une nouvelle voiture à la liste.
        * ✅ [...voitures, nouvelleVoiture] → Copie les anciennes voitures et ajoute la nouvelle à la fin.
        * 🔥 Ajouter une voiture via API
    */
    const handleAjoute = (nouvelleVoiture) => {
        fetch("https://api-htb9.vercel.app/voitures", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nouvelleVoiture),
        })
            .then(response => response.json())
            .then((date) => {
                setVoitures([...voitures, date]); //* ✅ Ajoute la nouvelle voiture à la liste
            })
            .catch(error => console.error("Erreur lors de l'ajout de la voiture :", error));
    };
    


    /*
        * ✅ handleModifier(voitureModifier) → Met à jour les informations d'une voiture.
        * ✅ .map(...) → Parcourt la liste des voitures et remplace la voiture modifiée.
        * 🔥 Modifier une voiture via API
    */
    const handleModifier = (voitureModifier) => {
        fetch(`https://api-htb9.vercel.app/voitures/${voitureModifier.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(voitureModifier),
        })
        .then(() => {
                setVoitures(voitures.map((voiture) => (
                    voiture.id === voitureModifier.id
                        ? voitureModifier
                        : voiture
                ))); //* ✅ Met à jour la voiture dans la liste
            })
        .catch(error => console.error("Erreur lors de la modification de la voiture :", error));
    };




    return (
        <div>
            <AjouterVoiture onAjout={handleAjoute} />
            <h2>Liste des voitures</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Marque</th>
                        <th>Type Voiture</th>
                        <th>Type Carburant</th>
                        <th>Discount</th>
                        <th>Prix de location</th>
                        <th>Image</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {voitures.map((voiture , index) => (
                        <Voiture voituree={voiture} key={voiture.id || index} supprimer={handleDelete} modifier={handleModifier} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}