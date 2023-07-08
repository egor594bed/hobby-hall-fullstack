import { createSlice } from "@reduxjs/toolkit";

interface IBasketSlice {
  basketCount: number;
}

const initialState: IBasketSlice = {
  basketCount: getInitBasketArr(),
};

function getInitBasketArr() {
  const basketStr = localStorage.getItem("basket") as string;
  const basketArr = JSON.parse(basketStr);
  return basketArr ? basketArr.length : 0;
}

export const basketSlice = createSlice({
  // Добавить слайс для товаров в корзине?
  name: "basketSlice",
  initialState,
  reducers: {
    addProduct: (state) => {
      state.basketCount += 1;
    },
    removeProduct: (state) => {
      state.basketCount -= 1;
    },
    removeAllFromBasket: (state) => {
      state.basketCount = 0;
    },
  },
});

export const { addProduct, removeProduct, removeAllFromBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
