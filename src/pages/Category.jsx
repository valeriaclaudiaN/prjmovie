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
import { useLocation } from "react-router-dom";

function Category() {
  const { categoryType } = useParams();
  const [query, setQuery] = useState("");

  //useLocation().search returns "?Page-{nr}"
  const pgQueryParam = new URLSearchParams(useLocation().search);
  let currentPage = pgQueryParam.get("Page");
  if (!currentPage) {
    currentPage = "1";
  }

  const categoryTypeModified = adjustCategoryType(categoryType);
  //Listing all popular movies/tv shows
  const categoryEndpoint = getPopularCategoryEndpoint(
    categoryTypeModified,
    currentPage
  );
  const category = useFetch(categoryEndpoint);
  const adaptedCategoryList = getCategoryList(category);

  //Listing all search findings of movies/TV Shows
  function handleChangeSearch(event) {
    setQuery(event.target.value);
    return query;
  }

  function searchCategory(e) {
    e.preventDefault();
  }
  const categorySearchEndpoint = getSearchCategoryEndpoint(
    categoryTypeModified,
    query,
    currentPage
  );

  const categorySearch = useFetch(categorySearchEndpoint);
  const adaptedCategorySearchList = getCategoryList(categorySearch);

  return (
    <Layout>
      <Container className="my-5  ">
        {categoryType === "TVShows" ? (
          <h1 className="mb-5 pt-3">TV Shows</h1>
        ) : (
          <h1 className="mb-5 pt-3">Movies</h1>
        )}
        <Form
          className=" mb-5 d-flex justify-content-center "
          onSubmit={searchCategory}
        >
          <FormControl
            className="me-2 w-25 "
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
            No {categoryType} found for "{query}".
          </p>
        ) : (
          <CardCategoryList categoryList={adaptedCategorySearchList} />
        )}

        <div className="d-flex justify-content-center">
          <Pag baseUrl={`/category/${categoryType}`} />
        </div>
      </Container>
    </Layout>
  );
}
export default Category;
