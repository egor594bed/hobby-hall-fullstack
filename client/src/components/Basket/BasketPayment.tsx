import React, { useState, useCallback } from "react";
import MySelect from "../UI/MySelect/MySelect";
import { IPayment } from "../../types/IBasket";
import type {
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import paymentArr from "../../assets/const/payment";

type FormProps<TFormValues extends FieldValues> = {
  register: UseFormRegister<FieldValues>;
  payment: UseFormRegisterReturn<"payment">;
};

const BasketPayment = <TFormValues extends FieldValues>({
  register,
}: FormProps<TFormValues>) => {
  const [activePayment, setActivePayment] = useState<IPayment | null>(null);

  //Смена активного селекта
  const changeActivePayment = useCallback((id: number | "none") => {
    if (id === "none") {
      setActivePayment(null);
      return;
    }
    let newPayment = paymentArr.find((elem) => {
      if (elem.id == id) return true;
    });
    if (newPayment !== undefined) {
      setActivePayment(newPayment);
    } else {
      setActivePayment(null);
    }
  }, []);

  return (
    <div className="basket__payment">
      <h2 className="basket__payment-title">Оплата</h2>
      <MySelect
        register={register}
        onChange={changeActivePayment}
        data={paymentArr}
      ></MySelect>
      <div
        className="basket__payment-wrapper"
        style={
          activePayment
            ? { background: "none" }
            : { backgroundImage: `url(${require("../../img/selectImg.png")})` }
        }
      >
        {activePayment && (
          <>
            <img
              className="basket__payment-img"
              src={require(`../../img/payment/${activePayment.imgName}`)}
            ></img>
            <div className="basket__payment-text-wrapper">
              <p className="basket__payment-text">{activePayment.text}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasketPayment;
