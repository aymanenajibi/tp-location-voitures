import { ADD_COMMENT, ADD_LIKE } from "./action";
import { initialState } from "./HotelStore";

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        db: state.db.map((hotel) =>
          hotel.IdHotel === action.payload.idHotel
            ? {
                ...hotel,
                Commentaires: [action.payload.comment, ...hotel.Commentaires],
              }
            : hotel
        ),
      };
    case ADD_LIKE:
      return {
        ...state,
        db: state.db.map((hotel) =>
          hotel.IdHotel === action.payload.idHotel
            ? { ...hotel, Like: hotel.Like + 1 }
            : hotel
        ),
      };
    default:
      return state;
  }
}
