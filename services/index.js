const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5000;

// Activer CORS pour éviter les erreurs de politique de sécurité
app.use(cors());

// Middleware pour servir les fichiers statiques
app.use("/images", express.static(path.join(__dirname, "images")));

// Middleware pour analyser les données JSON envoyées dans les requêtes
app.use(express.json());

// Liste des voitures (simulée)
let voitures = [
  {
    id: "v1",
    Marque: "Dacia Logan",
    TypeCarburant: "Diesel",
    PrixLocation: 250,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Dacia_Logan_III_%28cropped%29.jpg/800px-Dacia_Logan_III_%28cropped%29.jpg",
    discount: 10,
  },
  {
    id: "v2",
    Marque: "Peugeot 208",
    TypeCarburant: "Essence",
    PrixLocation: 350,
    image:
      "https://www.peugeot.ma/content/dam/peugeot/master/b2c/our-range/showroom/208/2023-10-new-208/mobile/208_GTEV_M.jpg?imwidth=768",
    discount: 15,
  },
  {
    id: "v3",
    Marque: "Renault Clio",
    TypeCarburant: "Essence",
    PrixLocation: 280,
    image:
      "https://sf1.sportauto.fr/wp-content/uploads/sportauto/2020/11/Renault_Clio_RS16_2016_f57ef.jpg",
    discount: 12,
  },
  {
    id: "v4",
    Marque: "Ford Fiesta",
    TypeCarburant: "Essence",
    PrixLocation: 230,
    image:
      "https://imgr1.auto-motor-und-sport.de/image-169FullWidth-4c270be5-1099909.jpg",
    discount: 18,
  },
  {
    id: "v5",
    Marque: "Toyota Yaris",
    TypeCarburant: "Hybrid",
    PrixLocation: 400,
    image:
      "https://images.caradisiac.com/logos/9/3/4/2/279342/S8-la-toyota-yaris-hybride-devient-encore-plus-chere-et-plus-puissante-204827.jpg",
    discount: 8,
  },
  {
    id: "v6",
    Marque: "Volkswagen Golf",
    TypeCarburant: "Diesel",
    PrixLocation: 480,
    image:
      "https://static.daktilo.com/sites/952/uploads/2024/08/06/large/volkswagen-golf-2024-tanitildi.jpg",
    discount: 5,
  },
  {
    id: "v7",
    Marque: "BMW 3 Series",
    TypeCarburant: "Essence",
    PrixLocation: 600,
    image:
      "https://www.topgear.com/sites/default/files/2022/11/P90485000_highRes_bmw-330e-xdrive-tour.jpg",
    discount: 10,
  },
  {
    id: "v8",
    Marque: "Mercedes-Benz A-Class",
    TypeCarburant: "Diesel",
    PrixLocation: 750,
    image:
      "https://car-images.bauersecure.com/wp-images/12579/102-mercedesaclass-frontcornering.jpg",
    discount: 12,
  },
  {
    id: "v9",
    Marque: "Audi A3",
    TypeCarburant: "Essence",
    PrixLocation: 650,
    image:
      "https://www.largus.fr/images/styles/max_1300x1300/public/2024-04/Audi-A3-sportback-2024-02.jpg?itok=IAjchqDb",
    discount: 10,
  },
  {
    id: "v10",
    Marque: "Nissan Juke",
    TypeCarburant: "Petrol",
    PrixLocation: 380,
    image:
      "https://www.automobile-magazine.fr/asset/cms/870x408/223442/config/170583/juke-mc-2024-exterior-iconic-yellow-body-color-n-sport-angled-view-j9qceqo.jpg",
    discount: 14,
  },
];

// Route pour récupérer la liste des voitures
app.get("/voitures", (req, res) => {
  res.json({ voitures });
});

// Route pour ajouter une voiture
app.post("/voitures", (req, res) => {
  const nouvelleVoiture = req.body;

  if (
    !nouvelleVoiture.id ||
    !nouvelleVoiture.Marque ||
    !nouvelleVoiture.PrixLocation
  ) {
    return res
      .status(400)
      .json({ message: "Les champs obligatoires sont manquants" });
  }

  voitures.push(nouvelleVoiture);
  res.status(201).json(nouvelleVoiture);
});

// Route pour supprimer une voiture
app.delete("/voitures/:id", (req, res) => {
  const { id } = req.params;
  const index = voitures.findIndex((voiture) => voiture.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Voiture non trouvée" });
  }

  voitures.splice(index, 1);
  res.status(200).json({ message: "Voiture supprimée avec succès" });
});

// Route pour modifier une voiture
app.put("/voitures/:id", (req, res) => {
  const { id } = req.params;
  const voitureModifiee = req.body;

  const index = voitures.findIndex((voiture) => voiture.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Voiture non trouvée" });
  }

  voitures[index] = { ...voitures[index], ...voitureModifiee };
  res.status(200).json(voitures[index]);
});

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de réservation de voitures!");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur API en cours d'exécution sur http://localhost:${port}`);
});
