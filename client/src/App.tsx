import React from "react";
import { Route, Routes, useRoutes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AdminAdd from "./components/Admin/AdminAdd";
import { AuthContext } from "./context/Auth.context";
import { ToastContext } from "./context/Toast.context";
import { useAuth } from "./hooks/auth.hook";
import { useToast } from "./hooks/toast.hook";
import AdminPanel from "./pages/AdminPanel";
import Catalog from "./pages/Catalog";
import Contacts from "./pages/Contacts";
import News from "./pages/News";
import Rules from "./pages/Rules";
import Basket from "./pages/Basket";
import CatalogDetailingItem from "./components/Catalog/CatalogDetailingItem"
import AdminOrderList from "./components/Admin/AdminOrderList";

function App() {
  const {token, login, logout, userId} = useAuth()
  const {toastList, setToast} = useToast()
  const isAuthenticated = !!token

  return (
    <ToastContext.Provider value={{toastList, setToast}}>
    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Navigate to="/catalog" />}></Route>
          <Route path="catalog" element={<Catalog/>}>
            <Route path="product/:id" element={<CatalogDetailingItem/>}></Route>
          </Route>
          <Route path="basket" element={<Basket/>}></Route>
          <Route path="rules" element={<Rules/>}></Route>
          <Route path="news" element={<News/>}></Route>
          <Route path="contacts" element={<Contacts/>}></Route>
          <Route path="*" element={<p>Страницы не существует</p>}></Route>
        </Route>
        <Route path="admin" element={<AdminPanel/>}>
          <Route path="add_product" element={<AdminAdd/>}></Route>
          <Route path="order_list" element={<AdminOrderList/>}></Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
    </ToastContext.Provider>
  )
}

export default App;
