import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";
import { IDelivery } from "../../types/IBasket";
import MySelect from "../UI/MySelect/MySelect";
import deliveryArr from "../../assets/const/delivery";

type FormProps<TFormValues extends FieldValues> = {
  register: UseFormRegister<FieldValues>;
};

const BasketDelivery = <TFormValues extends FieldValues>({
  register,
}: FormProps<TFormValues>) => {
  const [activeDelivery, setActiveDelivery] = useState<IDelivery | null>(null);

  //Смена активного селекта
  const changeActiveDelivery = useCallback((id: number | "none") => {
    if (id === "none") {
      setActiveDelivery(null);
      return;
    }
    let newDelivery = deliveryArr.find((elem) => {
      if (elem.id == id) return true;
    });
    if (newDelivery !== undefined) {
      setActiveDelivery(newDelivery);
    } else {
      setActiveDelivery(null);
    }
  }, []);

  return (
    <div className="basket__delivery">
      <h2 className="basket__delivery-title">Доставка</h2>
      <MySelect
        register={register}
        onChange={changeActiveDelivery}
        data={deliveryArr}
      ></MySelect>
      <div
        className="basket__delivery-wrapper"
        style={
          activeDelivery
            ? { background: "none" }
            : { backgroundImage: `url(${require("../../img/selectImg.png")})` }
        }
      >
        {activeDelivery && (
          <>
            <img
              className="basket__delivery-img"
              src={require(`../../img/delivery/${activeDelivery.imgName}`)}
            ></img>
            <div className="basket__delivery-text-wrapper">
              <p className="basket__delivery-text">{activeDelivery.text}</p>
              {activeDelivery.adressArr &&
                activeDelivery.adressArr.map((elem) => {
                  return <p>{elem}</p>;
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasketDelivery;
