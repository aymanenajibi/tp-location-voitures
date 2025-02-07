import React, { useState } from "react";


export default function AjouterVoiture({onAjout}) {
    const [nouvelleVoiture, setNouvelleVoiture] = useState({
        id: '',
        Marque: '',
        TypeVoiture: '',
        TypeCarburant: '',
        PrixLocation: '',
        image: '',
        discount: 0,
    });
    
    const [showDiscount , setShowDiscount] = useState(false);


    const handleChange = (e) => {
        setNouvelleVoiture({
            ...nouvelleVoiture,
            [e.target.name]: e.target.value
        });
    };

    const handleDiscountChange = (e) => {
        setNouvelleVoiture({
            ...nouvelleVoiture,
            discount: e.target.value
        });
    };

    const handleSubmit = (e) => {
        /*
            * ✅Empêche le rechargement de la page avec e.preventDefault()
        */
        e.preventDefault();
        
        if (nouvelleVoiture.Marque && nouvelleVoiture.PrixLocation) {
            onAjout(nouvelleVoiture); //* 🔥 Envoie à ListeVoitures
            setNouvelleVoiture({ id: "", Marque: "",TypeVoiture: "", TypeCarburant: "", PrixLocation: "", image: "" });
        } else {
            alert("Veuillez remplir tous les champs obligatoires !");
        }
    };

    const discountedPrice = nouvelleVoiture.discount
        ? nouvelleVoiture.PrixLocation - (nouvelleVoiture.PrixLocation * (nouvelleVoiture.discount / 100))
        : nouvelleVoiture.PrixLocation;

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Gestion des Voitures de Locations</h1>
            <form onSubmit={handleSubmit}>
                <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={nouvelleVoiture.id || ""}
                        onChange={handleChange} 
                        disabled
                        />
                        <br />
                <br />
                
                <input
                        type="text"
                        name="Marque"
                        placeholder="Marque"
                        value={nouvelleVoiture.Marque}
                        onChange={handleChange} />
                        <br />
                <br />

                <input
                        type="text" 
                        name="TypeVoiture"
                        placeholder="Type Voiture"
                        value={nouvelleVoiture.TypeVoiture}
                        onChange={handleChange} />
                        <br />
                <br />
                
                <input
                        type="text"
                        name="TypeCarburant"
                        placeholder="Type Carburant"
                        value={nouvelleVoiture.TypeCarburant}
                        onChange={handleChange} />
                        <br />
                <br />
                
                <input
                        type="number"
                        name="PrixLocation"
                        placeholder="Prix de Location"
                        value={nouvelleVoiture.PrixLocation}
                        onChange={handleChange} />
                        <br />
                <br />
                
                <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={nouvelleVoiture.image}
                        onChange={handleChange} />
                        <br />
                <br />
                
                {/* Checkbox pour afficher l'input discount */}
                <label>
                    Ajouter un discount
                </label>
                <input type="checkbox" onChange={() => setShowDiscount(!showDiscount)} />
                
                {showDiscount && (
                    <div>
                        <input type="number"
                            name="discount"
                            placeholder="Discount en %"
                            value={nouvelleVoiture.discount}
                            onChange={handleDiscountChange} />
                        <p style={{ color: 'green' }}>Prix apres discount : {discountedPrice}</p>
                    </div>
                )}

                <button type="submit" style={{ background: "blue", color: "white" , width: '100px' }}>
                    Ajouter
                </button>
                    <br />
                    <br />
            </form>
        </div>
    )
};