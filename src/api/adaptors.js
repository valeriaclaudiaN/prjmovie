//transforming the data from the API

export function getCategoryList(apiResponse) {
  if (!apiResponse || !apiResponse.results) {
    return [];
  }

  const rawCategoryList = apiResponse.results;

  const adaptedCategory = rawCategoryList.map((category) => {
    //Each movie object has a "title" key, whereas TV Show object has a "name" key

    let name;

    category.title ? (name = category.title) : (name = category.name);

    let deductedCategory;
    name === category.title
      ? (deductedCategory = "movies")
      : (deductedCategory = "TVShows");
    return {
      id: category.id,
      name,
      deductedCategory,
      imgPath: category.poster_path,
    };
  });
  return adaptedCategory;
}

export function getCategoryDetails(apiResponse) {
  if (!apiResponse) {
    return {};
  }
  let name;
  apiResponse.title ? (name = apiResponse.title) : (name = apiResponse.name);
  let deductedCategory;
  name === apiResponse.title
    ? (deductedCategory = "movies")
    : (deductedCategory = "TVShows");

  const rawCategoryDetails = apiResponse;
  const adaptedCategoryDetails = {
    name,
    motto: rawCategoryDetails.tagline,
    imgPath: rawCategoryDetails.poster_path,
    vote: rawCategoryDetails.vote_average,
    overview: rawCategoryDetails.overview,
    deductedCategory,
  };

  return adaptedCategoryDetails;
}
