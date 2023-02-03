import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useHistory } from "react-router-dom";

function Pag() {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  let page = currentPage;
  function handlePrevPage() {
    page > 1 && page--;
    setCurrentPage(page);
    console.log(history);
  }
  function handleNextPage() {
    page++;
    setCurrentPage(page);
    console.log(history);
  }

  return (
    <Pagination>
      <Pagination.Prev onClick={handlePrevPage} />
      <Pagination.Item active>{page}</Pagination.Item>

      <Pagination.Next onClick={handleNextPage} />
    </Pagination>
  );
}

export default Pag;
