import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

//Template layout to re-use for each component

function Layout(props) {
  return (
    <div className={`${styles.layout}`}>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
