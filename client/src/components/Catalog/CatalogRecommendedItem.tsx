import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/ICatalog";

const CatalogRecommendedItem: FC<IProduct> = (data) => {
  return (
    <Link to={`/catalog/product/${data._id}`}>
      <div className="catalog__recommended-item" id={data._id}>
        <img
          className="catalog__recommended-item-img"
          src={`/${data.imgSrc}`}
          onError={(event) =>
            (event.target as HTMLElement).setAttribute(
              "src",
              require("../../assets/img/nophoto.jpeg")
            )
          }
          alt="photo"
        ></img>
        <div className="catalog__recommended-item-text">
          <h2 className="catalog__recommended-item-title">{data.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CatalogRecommendedItem;
