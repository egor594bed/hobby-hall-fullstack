import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/slices/toasts";
import BasketService from "../service/basket-service";
import { addProduct, removeProduct } from "../redux/slices/basket";

export const useBasket = (
  id: string | undefined,
  productName: string | undefined
) => {
  const [inBasket, setinBasket] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && productName) setinBasket(BasketService.inBasket(id));
  }, [id]);

  const basketHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!id) return;
      BasketService.toggleBasketItem(id);
      setinBasket(!inBasket);
      if (!inBasket) {
        dispatch(addProduct());
        dispatch(
          addToast({
            id: Date.now(),
            message: `Товар "${productName}" добвален в корзину`,
            type: "info",
          })
        );
      } else {
        dispatch(removeProduct());
        dispatch(
          addToast({
            id: Date.now(),
            message: `Товар "${productName}" удален из корзины`,
            type: "info",
          })
        );
      }
    },
    [id, inBasket]
  );

  return {
    inBasket,
    basketHandler,
  };
};
