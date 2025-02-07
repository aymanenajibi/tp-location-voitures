import React, { useState} from 'react';

export default function Voiture({ voituree, supprimer, modifier }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedVoiture, setEditedVoiture] = useState({ ...voituree });

    const handleChange = (e) => {
        setEditedVoiture({
            ...editedVoiture,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        modifier(editedVoiture);
        setIsEditing(false);
    };

    const discountedPrice = editedVoiture.discount
        ? editedVoiture.PrixLocation - (editedVoiture.PrixLocation * (editedVoiture.discount / 100))
        : editedVoiture.PrixLocation;

    return (
        <tr>
            <td>{editedVoiture.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="Marque"
                        value={editedVoiture.Marque}
                        onChange={handleChange}
                    />
                ) : (
                    voituree.Marque
                )}
            </td>

            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="TypeVoiture"
                        value={editedVoiture.TypeVoiture}
                        onChange={handleChange}
                    />
                ) : (
                    voituree.TypeVoiture
                )}
            </td>
            
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="TypeCarburant"
                        value={editedVoiture.TypeCarburant}
                        onChange={handleChange}
                    />
                ) : (
                    voituree.TypeCarburant
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="discount"
                        value={editedVoiture.discount}
                        onChange={handleChange}
                    />
                ) : (
                    voituree.discount 
                )} %
            </td>
            <td>
                
                {isEditing ? (
                    <input
                        type="text"
                        name="PrixLocation"
                        value={editedVoiture.PrixLocation}
                        onChange={handleChange}
                    />
                ) : (
                   <>
                        {/* Affichage du prix avec style selon le discount */}
                        <span style={{ textDecoration: 'line-through', color: 'red' }}>
                            {voituree.PrixLocation} MAD
                        </span>
                        <span style={{ marginLeft: '10px' , color: 'green' }}>
                            {discountedPrice} MAD
                        </span>
                   </>
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="image"
                        value={editedVoiture.image}
                        onChange={handleChange}
                    />
                ) : (
                        <img
                            src={voituree.image}
                            alt={voituree.Marque}
                            width="100" 
                            
                        />
                )}
            </td>
            <td>
                { isEditing
                    ? (
                        <>
                            <button
                                onClick={handleSave}
                                style={{ background: "green", color: "white" , marginRight: '10px' }}
                            >
                                Enregistrer
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                style={{ background: "gray", color: "white" , marginRight: '10px' }}
                            >
                                Annuler
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{ background: "green", color: "white" , marginRight: '10px' }}
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => supprimer(voituree.id)}
                                style={{ background: "red", color: "white" , marginRight: '10px' }}
                            >
                                Supprimer
                            </button>
                        </>
                    )
               }
            </td>
        </tr>
    )
}
