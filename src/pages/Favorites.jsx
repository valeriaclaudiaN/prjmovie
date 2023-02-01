import { useContext } from "react";
import { Container } from "react-bootstrap";
import CardCategoryList from "../components/CardCategoryList";
import Layout from "../components/Layout";
import { FavContext } from "../store/context";

function Favorites() {
  const { favState } = useContext(FavContext);
  console.log(favState);
  const { favs } = favState;
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
