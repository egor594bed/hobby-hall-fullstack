import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MyToastContainer from "./UI/MyToast/MyToastContainer";

const Layout = () => {
  return (
    <>
      <MyToastContainer />
      <Header></Header>
      <div className="content container">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Layout;
