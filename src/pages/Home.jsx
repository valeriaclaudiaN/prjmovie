import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCategoryList } from "../api/adaptors";
import { getPopularCategoryEndpoint } from "../api/endpoints";
import CardCategoryList from "../components/CardCategoryList";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";

function Home() {
  //We get the first 6 movies/TV shows from the list

  const moviesEndpoint = getPopularCategoryEndpoint("movie");
  const movies = useFetch(moviesEndpoint);
  const adaptedMoviesList = getCategoryList(movies);
  const adaptedMoviesListFirstSix = adaptedMoviesList.slice(0, 6);

  const showsEndpoint = getPopularCategoryEndpoint("tv");
  const shows = useFetch(showsEndpoint);
  const adaptedShowsList = getCategoryList(shows);

  const adaptedShowsListFirstSix = adaptedShowsList.slice(0, 6);

  return (
    <Layout>
      <section className="my-5">
        <Container>
          <h1 className="mb-5 pt-3"> Movies</h1>
          <CardCategoryList categoryList={adaptedMoviesListFirstSix} />

          <Link to="/category/movie" class-name="text-secondary">
            <p className="text-decoration-underline text-white">
              {" "}
              See the complete list of all the popular movies at the moment.
            </p>
          </Link>
        </Container>
      </section>
      <section className="my-5">
        <Container>
          <h1 className="mb-5 pt-3"> TV Shows</h1>
          <CardCategoryList categoryList={adaptedShowsListFirstSix} />

          <Link to="/category/TVShows" class-name="text-secondary">
            <p className="text-decoration-underline text-white">
              {" "}
              See the complete list of all the popular TV Shows at the moment.
            </p>
          </Link>
        </Container>
      </section>
    </Layout>
  );
}

export default Home;
