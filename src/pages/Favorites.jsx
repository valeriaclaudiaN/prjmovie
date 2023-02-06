import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardCategoryList from "../components/CardCategoryList";
import Layout from "../components/Layout";
import { FavContext } from "../store/Favs/context";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

function Favorites() {
  const { favState } = useContext(FavContext);
  const { favs } = favState;

  /////

  //Section for updating the local storage after removing a movie/tvshow from favorites

  // We get the function which modifies the state of the local storage. We don't need the state from local storage, so we leave it empty.
  const [, setLocalStorageState] = useLocalStorage("favorites", favState);

  // When new favorite movies/TV shows are added in this section, the localStorage is updated with them. (The program suggests that setLocalStorageState should be also included in the dependency array)

  useEffect(() => {
    setLocalStorageState(favState);
  }, [favState, setLocalStorageState]);

  //////
  const adaptedMovieFavs = favs.filter(
    (movie) => movie.deductedCategory === "movies"
  );

  const adaptedTVSeriesFavs = favs.filter(
    (series) => series.deductedCategory === "TVShows"
  );

  return (
    <Layout>
      <Container className="my-5">
        <h1 className="mb-5 pt-3">Favorites</h1>
        <h1 className="mb-5 pt-3">Movies</h1>

        {adaptedMovieFavs.length !== 0 ? (
          <div>
            <CardCategoryList categoryList={adaptedMovieFavs} />
          </div>
        ) : (
          <p> You don't have any favorite movies, yet!</p>
        )}
        <h1 className="mb-5 pt-3"> TV Series</h1>
        {adaptedTVSeriesFavs.length !== 0 ? (
          <CardCategoryList categoryList={adaptedTVSeriesFavs} />
        ) : (
          <p> You don't have any favorite TV Series, yet!</p>
        )}
      </Container>
    </Layout>
  );
}

export default Favorites;
