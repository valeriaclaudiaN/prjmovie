export const initialState = {
  favs: [],
};

export function favReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVS": {
      const isInList = state.favs.find((category) => {
        return category.id === action.payload.id;
      });
      if (isInList) {
        return state;
      } else {
        const newState = { favs: [...state.favs, action.payload] };
        return newState;
      }
    }

    case "REMOVE_FROM_FAVS": {
      const filteredCategories = state.favs.filter(
        (category) => category.id !== action.payload
      );
      const newState = {
        favs: { ...filteredCategories },
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
