import { createStore } from "redux";
import hotelReducer from "./reducer";

export const initialState = {
  db: [
    {
      IdHotel: "Farah Inn",
      Nom_Hotel: "Farah Inn",
      Description:
        "Situé à Ifrane dans la région Moyen Atlas, idéal pour un séjour paisible.",
      Ville: "Ifrane",
      Images:
        "https://th.bing.com/th/id/OIP.dj89d6PKTTkWrmgQiAfDswHaEo?rs=1&pid=ImgDetMain",
      Commentaires: ["Trop loin du centre-ville", "L'accueil top"],
      Like: 90,
      Dislike: 5,
    },
    {
      IdHotel: "Sofitel Marrakech",
      Nom_Hotel: "Sofitel Marrakech",
      Description:
        "Un hôtel 5 étoiles luxueux au cœur de Marrakech, avec vue sur l'Atlas.",
      Ville: "Marrakech",
      Images:
        "https://www.hotelsmarrakesh.org/data/Imgs/OriginalPhoto/15165/1516535/1516535053/img-sofitel-marrakech-lounge-and-spa-hotel-marrakesh-86.JPEG",
      Commentaires: ["Service impeccable", "Piscine magnifique"],
      Like: 150,
      Dislike: 8,
    },
    {
      IdHotel: "Mazagan Beach Resort",
      Nom_Hotel: "Mazagan Beach Resort",
      Description:
        "Un complexe balnéaire de luxe offrant un casino et un parcours de golf.",
      Ville: "El Jadida",
      Images:
        "https://jla-architecture.com/wp-content/uploads/2020/01/1518519284299073-img_mazagan-beach-golf-resort-625x460-1.jpg",
      Commentaires: ["Plage superbe", "Un peu cher mais vaut le coup"],
      Like: 200,
      Dislike: 12,
    },
    {
      IdHotel: "Palais Faraj",
      Nom_Hotel: "Palais Faraj",
      Description:
        "Un magnifique hôtel de style riad offrant une expérience traditionnelle.",
      Ville: "Fès",
      Images:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/b9/46/a9/patio-du-palais-faraj.jpg?w=700&h=-1&s=1",
      Commentaires: ["Architecture magnifique", "Petit-déjeuner incroyable"],
      Like: 120,
      Dislike: 6,
    },
  ],
};

export const hotelStore = createStore(hotelReducer, initialState);

export default hotelStore;
