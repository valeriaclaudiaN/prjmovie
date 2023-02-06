import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCategoryDetails } from "../api/adaptors";
import { getCategoryDetailsEndpoint, getImgURL } from "../api/endpoints";
import Layout from "../components/Layout";
import { addToFavs } from "../store/Favs/actions";
import { FavContext } from "../store/Favs/context";
import { useFetch } from "../utils/hooks/useFetch";
import { adjustCategoryType } from "../utils/utilFunctions";
import styles from "./CategoryDetails.module.css";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
import { Alert } from "react-bootstrap";

//Individual page with details, for each movie/TVShow

function CategoryDetails() {
  const { categoryId, categoryType } = useParams();
  const [isAlertDisplayed, setDisplayAlert] = useState(false);

  const categoryDetailsEndpoint = getCategoryDetailsEndpoint(
    adjustCategoryType(categoryType),
    categoryId
  );

  const categoryDetails = useFetch(categoryDetailsEndpoint);
  const adaptedCategoryDetails = getCategoryDetails(categoryDetails);

  const { name, motto, imgPath, vote, overview, deductedCategory } =
    adaptedCategoryDetails;

  const { favDispatch, favState } = useContext(FavContext);

  /// Section for updating the local storage after adding a movie/tvshow to favorites

  // We get the function which modifies the state of the local storage. We don't need the state from local storage, so we leave it empty.
  const [, setLocalStorageState] = useLocalStorage("favorites", favState);

  // When new favorite movies/TV shows are added in the favorites section, the localStorage is updated with them. (The program suggests that setLocalStorageState should be also included in the dependency array)

  useEffect(() => {
    setLocalStorageState(favState);
  }, [favState, setLocalStorageState]);

  ///

  function handleAddToFavs(category) {
    const actionResult = addToFavs(category);
    favDispatch(actionResult);
  }

  return (
    <Layout>
      <Container className={`${styles.categoryDetails} my-5`}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="mb-5"> {name}</h1>
            <p className="fw-bold">{motto} </p>
            <div className="mb-4">
              <img
                src={
                  !imgPath
                    ? "https://bflix.biz/no-poster.png"
                    : getImgURL(imgPath)
                }
                alt="No poster available"
              />
            </div>
            <div className="fw-bold d-flex justify-content-between align-items-center mb-4">
              <p>IMDB Rating: {Math.round(vote * 100) / 100}</p>
              <Button
                variant="dark"
                // we need these specific keys because we are going to re-use CardCategoryList in Favorites page
                onClick={() => {
                  handleAddToFavs({
                    id: categoryId,
                    name,
                    imgPath,
                    deductedCategory,
                    hasCloseButton: true,
                  });
                  setDisplayAlert(true);
                  setTimeout(() => {
                    setDisplayAlert(false);
                  }, 2000);
                }}
              >
                Add to favorites
              </Button>
            </div>
            <div> {overview}</div>
            {isAlertDisplayed && (
              <Alert className={styles.alert}>
                Successfully added to favorites!
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default CategoryDetails;
