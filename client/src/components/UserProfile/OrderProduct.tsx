import React, { FC, memo } from "react";
import { IProduct } from "../../types/ICatalog";

interface IOrderProduct {
  product: IProduct;
}

const OrderProduct: FC<IOrderProduct> = memo(({ product }) => {
  return (
    <div className="order__product">
      <p className="order__product-title">
        {product.name} (x{product.total})
      </p>
      <p className="order__product-price">
        {product.price * (product.total || 1)}р.
      </p>
    </div>
  );
});

export default OrderProduct;
