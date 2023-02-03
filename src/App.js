import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import SearchCategory from "./pages/Category";
import CategoryDetails from "./pages/CategoryDetails";
import { useReducer } from "react";
import { favReducer, initialState } from "./store/reducer";
import { FavContext } from "./store/context";

function App() {
  const [favState, favDispatch] = useReducer(favReducer, initialState);

  return (
    <div className="App">
      <FavContext.Provider value={{ favState, favDispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/category/:categoryType" element={<SearchCategory />} />
          <Route
            path="/category/:categoryType/:categoryId"
            element={<CategoryDetails />}
          />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </FavContext.Provider>
    </div>
  );
}

export default App;
