import { ADD_COMMENT, ADD_LIKE ,DELETE_COMMENT, EDIT_COMMENT} from "./action";
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







      case DELETE_COMMENT:
      return {
        ...state,
        db: state.db.map((hotel) =>
          hotel.IdHotel === action.payload.hotelId
            ? {
                ...hotel,
                Commentaires: hotel.Commentaires.filter((_, index) => index !== action.payload.commentIndex),
              }
            : hotel
        ),
      };








    case EDIT_COMMENT:
      return {
        ...state,
        db: state.db.map((hotel) =>
          hotel.IdHotel === action.payload.hotelId
            ? {
                ...hotel,
                Commentaires: hotel.Commentaires.map((comment, index) =>
                  index === action.payload.commentIndex ? action.payload.newComment : comment
                ),
              }
            : hotel
        ),
      };





    default:
      return state;
  }
}
