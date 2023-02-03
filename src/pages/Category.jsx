import { Container, Form, FormControl } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getPopularCategoryEndpoint,
  getSearchCategoryEndpoint,
} from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { getCategoryList } from "../api/adaptors";
import CardCategoryList from "../components/CardCategoryList";
import { adjustCategoryType } from "../utils/utilFunctions";
import { useState } from "react";
import Pag from "../components/Pagination";

function SearchCategory() {
  const { categoryType } = useParams();
  const [query, setQuery] = useState("");

  const categoryTypeModified = adjustCategoryType(categoryType);
  //Listing all popular movies/tv shows
  const categoryEndpoint = getPopularCategoryEndpoint(categoryTypeModified);
  const category = useFetch(categoryEndpoint);
  const adaptedCategoryList = getCategoryList(category);

  //Listing all search findings of movies/TV Shows

  function handleChangeSearch(event) {
    setQuery(event.target.value);
    return query;
  }

  const categorySearchEndpoint = getSearchCategoryEndpoint(
    categoryTypeModified,
    query
  );
  const categorySearch = useFetch(categorySearchEndpoint);
  const adaptedCategorySearchList = getCategoryList(categorySearch);

  function searchCategory(e) {
    e.preventDefault();
    console.log("Searching");
  }

  return (
    <Layout>
      <Container className="my-5 ">
        {categoryType === "TVShows" ? (
          <h1 className="mb-5 pt-3">TV Shows</h1>
        ) : (
          <h1 className="mb-5 pt-3">Movies</h1>
        )}
        <Form className="d-flex mb-5" onSubmit={searchCategory}>
          <FormControl
            className="me-2 w-50 "
            type="search"
            placeholder={
              categoryType === "TVShows" ? "TV Shows Search" : "Movies Search"
            }
            aria-label="search"
            name="query"
            value={query}
            onChange={handleChangeSearch}
          />
        </Form>

        {query.length === 0 ? (
          <CardCategoryList categoryList={adaptedCategoryList} />
        ) : adaptedCategorySearchList.length === 0 ? (
          <p>
            No {categoryType} found for "{query}". Try again!
          </p>
        ) : (
          <CardCategoryList categoryList={adaptedCategorySearchList} />
        )}
        <Pag />
      </Container>
    </Layout>
  );
}
export default SearchCategory;
