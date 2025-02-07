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
    const [filtreType, setFiltreType] = useState("");//* ✅ Stocke le type de voiture sélectionné
    const [recherche, setRecherche] = useState("");//* ✅ Stocke la valeur de recherche saisie par l'utilisateur
    
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
        if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
            fetch(`https://api-htb9.vercel.app/voitures/${id}`, {
                method: "DELETE",
            })
            .then(() => {
                const nouvellesVoitures = voitures.filter((voiture) => voiture.id !== id);
    
                //* Réassignation des IDs après suppression
                const voituresAvecNouveauxIds = nouvellesVoitures.map((voiture, index) => ({
                    ...voiture,
                    id: `v${index + 1}`
                }));
    
                setVoitures(voituresAvecNouveauxIds);
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
        //! Générer un nouvel ID basé sur le nombre actuel de voitures
        const nouvelId = `v${voitures.length + 1}`;
    
        //! Ajouter l'ID généré à la nouvelle voiture
        const voitureAvecId = { ...nouvelleVoiture, id: nouvelId };
        fetch("https://api-htb9.vercel.app/voitures", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(voitureAvecId),
        })
            .then(response => response.json())
            .then((data) => {
                setVoitures([...voitures, data]); //* ✅ Ajoute la nouvelle voiture à la liste
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

/*
    //* Fonction de filtrage des voitures par type selectionné 
    const voituresFiltrees = voitures.filter((voiture) => { 
        const prix = parseFloat(voiture.PrixLocation);
        if (filtreType === "luxe") {
            return prix >= 1000 && prix <= 1500;
        } else if (filtreType === "economique") {
            return prix >= 200 && prix <= 500;
        } else if (filtreType === "suv") {
            return prix >= 500 && prix <= 1000;
        }
        return true; // Afficher toutes les voitures si aucun filtre n'est appliqué
    }); */

    //* Fonction de filtrage des voitures
    const voituresFiltrees = voitures.filter((voiture) => {
        return voiture.Marque.toLowerCase().includes(recherche.toLowerCase()) &&
            (filtreType
                ? voiture.TypeVoiture.toLowerCase() === filtreType.toLowerCase()
                : true
            );
    });
      


    return (
        <div>
            <AjouterVoiture onAjout={handleAjoute} />
            <h2 style={{marginLeft: "35px", fontWeight:"bold"}}>Liste des voitures</h2>

            {/* Barre de recherche */}
            <input 
                    type="text" 
                    placeholder="Rechercher une voiture (ex: Dacia Logan)" 
                    value={recherche} 
                    onChange={(e) => setRecherche(e.target.value)} 
                    style={{ padding: "10px", margin: "15px", width: "100%" }} 
            />


            
            {/* Ajout de la barre de recherche pour filtrer */}
            <label style={{marginLeft: "250px"}}>Filtrer par type de voiture</label>
            <select value={filtreType} onChange={(e) => setFiltreType(e.target.value)}
                style={{ padding: "10px", marginLeft: "15px"}} >
                <option value="">Toutes</option>
                <option value="Luxe">Luxe 1000 - 1500 MAD</option>
                <option value="Économique">Économique 200 - 500 MAD</option>
                <option value="SUV">SUV 500 - 1000 MAD</option>
            </select>
            <br />
            <br />
            
            
            {/* Tableau des voitures */}
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
                    {voituresFiltrees.map((voiture , index) => (
                        <Voiture voituree={voiture} key={voiture.id || index} supprimer={handleDelete} modifier={handleModifier} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}