export function adjustCategoryType(categoryType) {
  let categoryTypeModified;
  categoryType === "movies"
    ? (categoryTypeModified = "movie")
    : (categoryTypeModified = "tv");
  return categoryTypeModified;
}
