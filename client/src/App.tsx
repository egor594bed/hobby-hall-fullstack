import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import Basket from "./pages/Basket";
import CatalogDetailingItem from "./components/Catalog/CatalogDetailingItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/auth";
import { ThunkDispatch } from "@reduxjs/toolkit";
import UnderConstruction from "./components/UnderConstruction";
import NotFound from "./components/NotFound";
import UserProfile from "./pages/UserProfile";

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Catalog />}></Route>
        <Route path="catalog" element={<Catalog />}>
          <Route path="product/:id" element={<CatalogDetailingItem />}></Route>
        </Route>
        <Route path="basket" element={<Basket />}></Route>
        <Route path="profile" element={<UserProfile />}></Route>
        <Route path="rules" element={<UnderConstruction />}></Route>
        <Route path="contacts" element={<UnderConstruction />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
