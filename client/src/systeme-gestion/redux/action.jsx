export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_LIKE = "ADD_LIKE";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const ADD_HOTEL = "ADD_HOTEL";

export const addComment = (idHotel, comment) => ({
  type: ADD_COMMENT,
  payload: { idHotel, comment },
});

export const addLike = (idHotel) => ({
  type: ADD_LIKE,
  payload: { idHotel },
});

export const deleteComment = (hotelId, commentIndex) => {
  return {
    type: DELETE_COMMENT,
    payload: { hotelId, commentIndex },
  };
};

export const editComment = (hotelId, commentIndex, newComment) => {
  return {
    type: EDIT_COMMENT,
    payload: { hotelId, commentIndex, newComment },
  };
};

export const addHotel = (newHotel) => ({
  type: ADD_HOTEL,
  payload: newHotel,
});
