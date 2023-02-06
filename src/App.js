import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import CategoryDetails from "./pages/CategoryDetails";
import { useReducer } from "react";
import { favReducer, initialState } from "./store/Favs/reducer";
import { FavContext } from "./store/Favs/context";
import Category from "./pages/Category";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";

function App() {
  //Initializing the state starting from localStorage
  //If we have a state in localStorage, we use it, if not, we start from initialState (which is initially [])

  const [initialLocalStorageState] = useLocalStorage("favorites", initialState);
  const [favState, favDispatch] = useReducer(
    favReducer,
    initialLocalStorageState
  );

  return (
    <div className="App">
      <FavContext.Provider value={{ favState, favDispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/category/:categoryType" element={<Category />} />
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
