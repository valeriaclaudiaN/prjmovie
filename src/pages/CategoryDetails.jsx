import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCategoryDetails } from "../api/adaptors";
import { getCategoryDetailsEndpoint, getImgURL } from "../api/endpoints";
import Layout from "../components/Layout";
import { addToFavs } from "../store/actions";
import { FavContext } from "../store/context";
import { useFetch } from "../utils/hooks/useFetch";
import { adjustCategoryType } from "../utils/utilFunctions";
import styles from "./CategoryDetails.module.css";

//Individual page with details, for each movie/TVShow

function CategoryDetails() {
  const { categoryId, categoryType } = useParams();

  const categoryDetailsEndpoint = getCategoryDetailsEndpoint(
    adjustCategoryType(categoryType),
    categoryId
  );

  const categoryDetails = useFetch(categoryDetailsEndpoint);
  console.log(categoryDetails);
  const adaptedCategoryDetails = getCategoryDetails(categoryDetails);

  console.log(adaptedCategoryDetails);
  const { name, motto, imgPath, vote, overview, deductedCategory } =
    adaptedCategoryDetails;

  const { favDispatch } = useContext(FavContext);

  function handleAddToFavs(category) {
    const actionResult = addToFavs(category);
    favDispatch(actionResult);
  }

  return (
    <Layout>
      <Container className={`${styles.categoryDetails} my-5`}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5"> {name}</h1>
            <p className="fw-bold">{motto} </p>
            <div className="mb-4">
              <img src={getImgURL(imgPath)} alt="No img found" />
            </div>
            <div className="fw-bold d-flex justify-content-between align-items-center mb-4">
              <p>Rating: {vote}</p>
              <Button
                variant="dark"
                // we need these specific keys because we are going to re-use CardCategoryList in Favorites page
                onClick={() => {
                  handleAddToFavs({
                    id: categoryId,
                    name,
                    imgPath,
                    deductedCategory,
                  });
                }}
              >
                Add to favorites
              </Button>
            </div>
            <div> {overview}</div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default CategoryDetails;
