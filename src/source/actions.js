export function addToFavs(category) {
  return {
    type: "ADD_TO_FAVS",
    payload: category,
  };
}

export function removeFromFavs(categoryId) {
  return {
    type: "REMOVE_FROM_FAVS",
    payload: categoryId,
  };
}
