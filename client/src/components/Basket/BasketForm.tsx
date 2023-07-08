import { FC, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { addToast } from "../../redux/slices/toasts";
import { useForm } from "react-hook-form";
import { removeAllFromBasket } from "../../redux/slices/basket";
import { IDelivery } from "../../types/IBasket.js";
import { IProduct } from "../../types/ICatalog";
import MyButton from "../UI/MyButton/MyButton";
import cl from "../UI/MySelect/MySelect.module.scss";
import deliveryArr from "../../assets/const/delivery";
import paymentArr from "../../assets/const/payment";

interface IBasketForm {
  disableButton: boolean;
  setBasketArr: React.Dispatch<React.SetStateAction<IProduct[]>>;
  basketArr: IProduct[];
}

const BasketForm: FC<IBasketForm> = ({
  disableButton,
  setBasketArr,
  basketArr,
}) => {
  const [activeDelivery, setActiveDelivery] = useState<IDelivery | null>(null);
  const [activePayment, setActivePayment] = useState<IDelivery | null>(null);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  function changeActiveOption(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLInputElement;
    if (target.name === "delivery") {
      const newActiveDelivery = deliveryArr.find(
        (elem) => elem.id === Number(target.value)
      );
      setActiveDelivery(newActiveDelivery!);
    } else if (target.name === "payment") {
      const newActivePayment = paymentArr.find(
        (elem) => elem.id === Number(target.value)
      );
      setActivePayment(newActivePayment!);
    }
  }

  // ОТПРАВИТЬ ЗАКАЗ В БД
  const postNewOrder = (orderData: any) => {
    const userData = localStorage.getItem("userData") as string;
    const userId = JSON.parse(userData).userId;

    const date = () => {
      const locale = "ru-ru";
      const d = new Date();

      const day = d.getDate();
      const month = d.toLocaleString(locale, { month: "long" });
      const year = d.getFullYear();

      const time = d.toLocaleString(locale, {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
      });

      return `${month} ${day}, ${year} @ ${time}`; // May 5, 2019 @ 23:41
    };

    delete orderData.checkbox;
    orderData.userId = userId;
    orderData.date = date();
    orderData.status = "Новый";
    orderData.basketArr = basketArr;

    request("api/order/newOrder", "POST", { ...orderData }).then(() => {
      localStorage.removeItem("basket");
      setBasketArr([]);
      window.scrollTo(0, 0);
      dispatch(
        addToast({
          message:
            "Заказ успешно оформлен! Мы с вами свяжемся в ближайшее время! Спасибо за покупки!",
          type: "success",
          id: Date.now(),
        })
      );
      dispatch(removeAllFromBasket());
    });
  };

  return (
    <form onSubmit={handleSubmit(postNewOrder)}>
      <select
        className={cl.MySelect}
        {...register("delivery", {
          validate: (value: string) => value != "none",
          onChange: (e) => changeActiveOption(e),
        })}
      >
        <option value={"none"}>--Выберите способ--</option>
        {deliveryArr.map((elem) => {
          return (
            <option value={elem.id} key={elem.id}>
              {elem.name}
            </option>
          );
        })}
      </select>
      <div
        className="basket__delivery-wrapper"
        style={
          activeDelivery
            ? { background: "none" }
            : {
                backgroundImage: `url(${require("../../assets/img/selectImg.png")})`,
              }
        }
      >
        {activeDelivery && (
          <>
            <img
              className="basket__delivery-img"
              src={require(`../../assets/img/delivery/${activeDelivery.imgName}`)}
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
      <select
        className={cl.MySelect}
        {...register("payment", {
          validate: (value: string) => value != "none",
          onChange: (e) => changeActiveOption(e),
        })}
      >
        <option value={"none"}>--Выберите способ--</option>
        {paymentArr.map((elem) => {
          return (
            <option value={elem.id} key={elem.id}>
              {elem.name}
            </option>
          );
        })}
      </select>
      <div
        className="basket__payment-wrapper"
        style={
          activePayment
            ? { background: "none" }
            : {
                backgroundImage: `url(${require("../../assets/img/selectImg.png")})`,
              }
        }
      >
        {activePayment && (
          <>
            <img
              className="basket__payment-img"
              src={require(`../../assets/img/payment/${activePayment.imgName}`)}
            ></img>
            <div className="basket__payment-text-wrapper">
              <p className="basket__payment-text">{activePayment.text}</p>
              {activePayment.adressArr &&
                activePayment.adressArr.map((elem) => {
                  return <p>{elem}</p>;
                })}
            </div>
          </>
        )}
      </div>
      <div className="basket__comment">
        <h2 className="basket__comment-title">Комментарий к заказу</h2>
        <div className="basket__comment-wrapper">
          <p className="basket__comment-text">
            Вы можете оставить комментарий к заказу, если вам необходимо
          </p>
          <textarea
            className="basket__comment-input"
            {...register("comment")}
            placeholder="Оставте свой комментарий"
          />
        </div>
      </div>
      <div className="basket__order">
        <div className="basket__order-checkbox-wrapper">
          <input
            type="checkbox"
            {...register("checkbox", {
              required: true,
            })}
            defaultChecked={true}
          ></input>
          <label>Согласен с бла бла бла</label>
        </div>
        <MyButton
          style={{ fontSize: "20px" }}
          disabled={disableButton || !isValid}
        >
          Оформить заказ
        </MyButton>
      </div>
    </form>
  );
};

export default BasketForm;
