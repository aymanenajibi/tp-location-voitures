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




                    /*
                        * ✅ Gestion des États (useState) :
                        * ✅ voitures → Stocke toutes les voitures récupérées depuis l'API 🚗📂
                        * ✅ filtreType → Stocke le type de voiture sélectionné dans le filtre 🔍
                        * ✅ recherche → Stocke le texte saisi dans la barre de recherche 🔤
                    */

export default function ListeVoitures() { 
    const [voitures, setVoitures] = useState([]);       //* ✅ Stocke toutes les voitures récupérées depuis l'API
    const [filtreType, setFiltreType] = useState("");   //* ✅ Stocke le type de voiture sélectionné
    const [recherche, setRecherche] = useState("");     //* ✅ Stocke la valeur de recherche saisie par l'utilisateur
    





                    /*
                        * ✅ fetch("http://localhost:5000/voitures") → Envoie une requête HTTP pour récupérer la liste des voitures.
                        * ✅ response.json() → Convertit la réponse de l’API en format JSON.
                        * ✅ setVoitures(data.voitures) → Met à jour l’état voitures avec les données reçues. 
                    */
    
    useEffect(() => {
        fetch("https://api-htb9.vercel.app/voitures")   //* 1️⃣ Appel API pour récupérer les voitures
            
            .then(response => response.json())          //* 2️⃣ Conversion de la réponse en JSON

            .then(data => {
                console.log("Données reçues:", data.voitures);
                console.log("Données reçues:", voitures.length);//* nombre de voitures
                
                /*
                    *   ✅ en normal on utilise setVoitures(data) 
                    *       mais ici on a un objet data qui contient un tableau de voitures
                */
                
                setVoitures(data.voitures);             //* 3️⃣ Mise à jour de l'état voitures     
            })
                                                        //* 4️⃣ Gestion des erreurs
            .catch(error => console.error("Erreur lors du chargement des voitures :", error)); 
    }, []);
    
    





                    /* 
                        * ✅ window.confirm(...) → Affiche une boîte de confirmation avant la suppression.
                        * ✅ .filter(...) → Crée une nouvelle liste sans la voiture sélectionnée.
                        * 🔥 Supprimer une voiture via API
                    */
                    
                    /*
                        !    Methode handleDelete sans API :  </>
                        ?   const handleDelete = (id) => {
                        *       if (window.confirm("Voulez-vous vraiment supprimer cette voiture ? ")) {  
                        *           cosnt nouvellesVoitures = voitures.filter((voiture) => voiture.id !== id);
                        ?           const voituresAvecNouveauxIds = nouvellesVoitures.map((voiture, index) => ({
                        ?               ...voiture,
                        ?               id: `v${index + 1}` // index = 0 + 1 → v1, index = 1 + 1 → v2, etc.
                        ?           }));
                        *           setVoitures(voituresAvecNouveauxIds);
                        *        }
                        ?    };
                    */
    
    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {   
            fetch(`https://api-htb9.vercel.app/voitures/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                //*pour supprimer avec filter  
                const nouvellesVoitures = voitures.filter((voiture) => voiture.id !== id); //* ✅ Crée une nouvelle liste sans la voiture sélectionnée
                
                //*map pour reassigner les ids et les afficher correctement dans le tableau de voitures
                const voituresAvecNouveauxIds = nouvellesVoitures.map((voiture, index) => ({
                    ...voiture,
                    id: `v${index + 1}`
                })); //* ✅ Réassignation des IDs après suppression
                
    
                setVoitures(voituresAvecNouveauxIds); //* ✅ Met à jour la liste des voitures après suppression 
            })
            .catch(error => console.error("Erreur lors de la suppression de la voiture :", error));
        }
    };
    





    
                    /*   
                        * ✅ handleAjout(nouvelleVoiture) → Ajoute une nouvelle voiture à la liste.
                        * ✅ [...voitures, nouvelleVoiture] → Copie les anciennes voitures et ajoute la nouvelle à la fin.
                        * 🔥 Ajouter une voiture via API
                    */
                    
                    /*
                        ! Methode handleAjoute sans API :  </>
                        ?   const handleAjoute = (nouvelleVoiture) => {
                        *        const nouvelId = `v${voitures.length + 1}`; //* Générer un nouvel ID basé sur le nombre actuel de voitures
                        *        setVoitures([...voitures, nouvelleVoiture]); //* ✅ Ajoute la nouvelle voiture à la liste
                        ?    };
                    */
    
                    /*
                        !📝 Explication étape par étape :
                        * 1️⃣ Génération d’un nouvel ID → Assure que chaque voiture a un identifiant unique.
                        * 2️⃣ Ajout de l’ID dans l’objet voiture → Permet d’envoyer une voiture complète à l’API.
                        * 3️⃣ Envoi en format JSON → L’API accepte uniquement du JSON (headers).
                        * 4️⃣ Conversion en JSON (JSON.stringify) → Transforme l’objet voiture en texte.
                        * 5️⃣ Mise à jour locale (setVoitures) → Ajoute la nouvelle voiture à l’affichage.
                        * 6️⃣ Gestion des erreurs (catch) → Affiche un message en cas de problème.
                    */
    
    const handleAjoute = (nouvelleVoiture) => {  
        const nouvelId = `v${voitures.length + 1}`;//* Générer un nouvel ID basé sur le nombre actuel de voitures
        
        const voitureAvecId = { ...nouvelleVoiture, id: nouvelId };//* Ajouter l'ID généré à la nouvelle voiture
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
                    
                    /*
                        ! Methode handleModifier sans API :  </>
                        ?   const handleModifier = (voitureModifier) => {
                        *       setVoitures(voitures.map((voiture) => (
                        *           voiture.id === voitureModifier.id
                        *               ? voitureModifier
                        *               : voiture
                        *       )));
                        ?   };
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
                * ✅ VoituresFiltrees → Stocke les voitures filtrées par type et recherche.
                * ✅ .filter(...) → Crée une nouvelle liste de voitures filtrées.
                * ✅ .toLowerCase() → Convertit les chaînes de caractères en minuscules.
                * ✅ .includes(...) → Vérifie si une chaîne de caractères est incluse dans une autre.
                * ✅ parseFloat(...) → Convertit une chaîne de caractères en nombre à virgule .
                */
    
    
                /*
                
                ! Fonction de filtrage des voitures par type selectionné
                ?   const voituresFiltrees = voitures.filter((voiture) => { 
                
                ?        const prix = parseFloat(voiture.PrixLocation);
                *        if (filtreType === "luxe") {
                *            return prix >= 1000 && prix <= 1500;
                *        } else if (filtreType === "economique") {
                *            return prix >= 200 && prix <= 500;
                *        } else if (filtreType === "suv") {
                *            return prix >= 500 && prix <= 1000;
                *        }
                ?        return true; // Afficher toutes les voitures si aucun filtre n'est appliqué

                *    }); 
               
                */

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