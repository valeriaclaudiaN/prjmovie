import { Col, Container, Row } from "react-bootstrap";
import CardCategory from "./CardCategory";

//Component for creating a responsive, nice layout (grid) for re-use. Re-using CardCategory component.

function CardCategoryList(props) {
  const { categoryList } = props;
  return (
    <Container>
      <Row>
        {categoryList.map((category) => (
          <Col xs={12} md={5} lg={4} className="mb-4" key={category.id}>
            <CardCategory
              id={category.id}
              name={category.name}
              imgPath={category.imgPath}
              deductedCategory={category.deductedCategory}
              hasCloseButton={category.hasCloseButton}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CardCategoryList;
