import { useContext } from "react";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getImgURL } from "../api/endpoints";
import { removeFromFavs } from "../store/actions";
import { FavContext } from "../store/context";
import styles from "./CardCategory.module.css";

//Component for displaying movie/TVShow cards + adding links to them (no layout adjustment). Re-used in CardCategoryList component

function CardCategory(props) {
  const { id, name, imgPath, deductedCategory, hasCloseButton } = props;
  const { categoryType } = useParams();

  const { favDispatch } = useContext(FavContext);

  function handleRemoveFromFavs(id) {
    const actionResult = removeFromFavs(id);
    favDispatch(actionResult);
  }

  return (
    //deductedCategory is taken from adaptors, deducted from the available fields (this is useful when we want to reach the CategoryDetails page from Home/Favorite page, so we cannot get the categoryType from the link)
    <Card
      className={`${styles.cardCategory} h-100 d-flex flex-content  align-items-center`}
    >
      <Link
        to={`/category/${categoryType ? categoryType : deductedCategory}/${id}`}
      >
        <Card.Img
          variant="top"
          src={
            !imgPath ? "https://bflix.biz/no-poster.png" : getImgURL(imgPath)
          }
          alt="No poster available"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
      </Link>
      {hasCloseButton && (
        <Button
          variant="light"
          onClick={() => {
            handleRemoveFromFavs(id);
          }}
        >
          <span className="material-icons text-dark"> close</span>
        </Button>
        //handleRemoveFromFavs has as parameter id because the action of removing has as payload the id
      )}
    </Card>
  );
}

export default CardCategory;
