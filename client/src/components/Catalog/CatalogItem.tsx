import React, { FC } from "react";
import { Link } from "react-router-dom";
import MyButton from "../UI/MyButton/MyButton";
import { IProduct } from "../../types/ICatalog";
import MyFavorite from "../UI/MyFavorite/MyFavorite";
import { useFavorite } from "../../hooks/favorite.hook";
import { useBasket } from "../../hooks/basket.hook";

const CatalogItem: FC<IProduct> = (productData) => {
  const { isFavorite, favoriteHandler } = useFavorite(
    productData._id,
    productData.name
  );
  const { inBasket, basketHandler } = useBasket(
    productData._id,
    productData.name
  );

  return (
    <div className="catalog__item" id={productData._id}>
      <Link
        to={`/catalog/product/${productData._id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="catalog__item-wrapper">
          <div className="catalog__item-img-wrapper">
            <img
              className="catalog__item-img"
              src={`/${productData.imgSrc}`}
              onError={(event) =>
                (event.target as HTMLElement).setAttribute(
                  "src",
                  require("../../assets/img/nophoto.jpeg")
                )
              }
              alt="photo"
            ></img>
          </div>
          <MyFavorite
            favoriteHandler={favoriteHandler}
            isFavorite={isFavorite}
          ></MyFavorite>
          <div className="catalog__item-text">
            <h2 className="catalog__item-title">{productData.name}</h2>
            {productData.description && (
              <p className="catalog__item-description">
                {productData.description}
              </p>
            )}
          </div>
          <div className="catalog__item-wrapper-bottom">
            <h4 className="catalog__item-price">{`${productData.price} р.`}</h4>
            {productData.quantity < 1 ? (
              <MyButton disabled>{"Нет в наличии"}</MyButton>
            ) : (
              <MyButton
                onClick={basketHandler}
                data-id={productData._id}
                style={{ width: "50%" }}
              >
                {inBasket ? "Удалить" : "В корзину"}
              </MyButton>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CatalogItem;
