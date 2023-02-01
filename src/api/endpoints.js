const API_KEY = "08bb6e2921ee867a7d1faebcc7443a93";

// getting the data for the search bar functionality
export function getSearchCategory(category, pageNumber = 1) {
  const queryParams = `${category}?api_key=
  ${API_KEY}&language=en-US&page=${pageNumber}`;
  return `https://api.themoviedb.org/3/search/${queryParams}`;
}

// getting all the (popular) movies/TV shows
export function getPopularCategoryEndpoint(category, pageNumber = 1) {
  const queryParams = `${category}/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
  return `https://api.themoviedb.org/3/${queryParams}`;
}

//getting the image for each Movie/TV show card
export function getImgURL(imgPath) {
  return `https://image.tmdb.org/t/p/w500/${imgPath}`;
}

export function getCategoryDetailsEndpoint(category, id) {
  const queryParams = `${category}/${id}?api_key=${API_KEY}&language=en-US`;
  return `https://api.themoviedb.org/3/${queryParams}`;
}
