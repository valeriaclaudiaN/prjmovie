import { useState } from "react";
import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Header() {
  const [isDisplayed, setIsDisplayed] = useState(false);

  function handleMenuClick() {
    setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
  }

  let dropdownMenuClasses = styles.dropdownMenu;
  if (isDisplayed) {
    dropdownMenuClasses += ` ${styles.displayMobileMenu}`;
  }

  return (
    <header className={`${styles.nav}`}>
      <nav className={`w-100`}>
        <Container className="d-flex justify-content-between align-items-center">
          <Link to="/" className="p-3">
            <img src="/logo.png" alt="Cinephile's Studio logo" />
          </Link>
          <div>
            <span
              onClick={handleMenuClick}
              className={`material-icons ${styles.menuIcon} text-light`}
            >
              {" "}
              menu{" "}
            </span>
            <ul className={dropdownMenuClasses}>
              <li className={isDisplayed ? "container" : null}>
                <Link
                  to="/category/movies"
                  className="p-3 text-uppercase text-light"
                >
                  Movies
                </Link>
              </li>
              <li className={isDisplayed ? "container" : null}>
                <Link
                  to="/category/TVShows"
                  className="p-3 text-uppercase text-light"
                >
                  TV Shows
                </Link>
              </li>
              <li className={isDisplayed ? "container" : null}>
                <Link to="/favorites" className="p-3 text-uppercase text-light">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
}

export default Header;
