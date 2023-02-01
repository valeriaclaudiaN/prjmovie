import { Container, Form, FormControl, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPopularCategoryEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import { getCategoryList } from "../api/adaptors";
import CardCategoryList from "../components/CardCategoryList";
import { adjustCategoryType } from "../utils/utilFunctions";

function SearchCategory() {
  const { categoryType } = useParams();
  const categoryTypeModified = adjustCategoryType(categoryType);
  const categoryEndpoint = getPopularCategoryEndpoint(categoryTypeModified);
  const category = useFetch(categoryEndpoint);

  const adaptedCategoryList = getCategoryList(category);

  return (
    <Layout>
      <Container className="my-5">
        {categoryType === "TVShows" ? (
          <h1 className="mb-5 pt-3">TV Shows</h1>
        ) : (
          <h1 className="mb-5 pt-3">Movies</h1>
        )}
        <Form className="d-flex mb-5">
          <FormControl
            className="me-2"
            type="search"
            placeholder={
              categoryType === "TVShows" ? "TV Shows Search" : "Movies Search"
            }
            aria-label="search"
          />

          <Button className="btn-sm" variant="dark" type="submit">
            Search {categoryType === "TVShows" ? "TV Shows" : "Movies"}
          </Button>
        </Form>
        <CardCategoryList categoryList={adaptedCategoryList} />
      </Container>
    </Layout>
  );
}
export default SearchCategory;
