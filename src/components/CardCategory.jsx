import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getImgURL } from "../api/endpoints";

//Component for displaying movie/TVShow cards + adding links to them (no layout adjustment). Re-used in CardCategoryList component

function CardCategory(props) {
  const { id, name, imgPath, deductedCategory } = props;
  const { categoryType } = useParams();

  return (
    //deductedCategory is taken from adaptors, deducted from the available fields (this is useful when we want to reach the CategoryDetails page from Home page, so we cannot get the categoryType from the link)

    <Link
      to={`/category/${categoryType ? categoryType : deductedCategory}/${id}`}
    >
      <Card className="h-100">
        <Card.Img variant="top" src={getImgURL(imgPath)} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CardCategory;
