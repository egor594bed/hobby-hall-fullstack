import React, { memo } from "react";
import { Link } from "react-router-dom";
import ContactInfo from "./ContactInfo";

const Footer = memo(() => {
  return (
    <div className="footer">
      <div className="footer__wrapper container">
        <div
          style={{
            backgroundColor: "#ecdfc9",
            width: "300px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Картинка?
        </div>
        <div className="footer__links">
          <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
            Главная
          </Link>
          <Link to={"/rules"} onClick={() => window.scrollTo(0, 0)}>
            Правила
          </Link>
          <Link to={"/news"} onClick={() => window.scrollTo(0, 0)}>
            Новинки
          </Link>
          <Link to={"/contacts"} onClick={() => window.scrollTo(0, 0)}>
            Контакты
          </Link>
          <Link to={"/basket"} onClick={() => window.scrollTo(0, 0)}>
            Корзина
          </Link>
        </div>
        <ContactInfo />
      </div>
    </div>
  );
});

export default Footer;
