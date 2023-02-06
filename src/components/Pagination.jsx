import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

function Pag(props) {
  let { baseUrl } = props;
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  let page = currentPage;

  //useLocation().search returns "?Page-{nr}"
  //Reseting page to the current page from the url (useful for switching between movies and TV Shows)
  const pgQueryParam = new URLSearchParams(useLocation().search);
  let currentPageUrl = pgQueryParam.get("Page");
  if (!currentPageUrl) {
    page = "1";
  }

  function handlePrevPage() {
    page > 1 && page--;
    setCurrentPage(page);
    navigate(`${baseUrl}?Page=${page}`);
  }
  function handleNextPage() {
    page++;
    setCurrentPage(page);
    navigate(`${baseUrl}?Page=${page}`);
  }

  return (
    <Pagination>
      <Pagination.Prev onClick={handlePrevPage} />
      <Pagination.Item disabled>{page}</Pagination.Item>

      <Pagination.Next onClick={handleNextPage} />
    </Pagination>
  );
}

export default Pag;
