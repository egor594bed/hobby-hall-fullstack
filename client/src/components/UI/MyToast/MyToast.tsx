import React, { FC } from "react";
import cl from "./MyToast.module.scss";
import { removeOnClick } from "../../../redux/slices/toasts";
import { useDispatch } from "react-redux";

interface IMyToast {
  id: number;
  message: string;
  type: string;
}

const MyToast: FC<IMyToast> = ({ id, message, type }) => {
  const dispatch = useDispatch();

  let img = "";

  if (type === "success") img = require("../../../assets/img/success-icon.png");
  else if (type === "error")
    img = require("../../../assets/img/error-icon.png");
  else if (type === "info") img = require("../../../assets/img/info-icon.png");

  function removeToast() {
    dispatch(removeOnClick(id));
  }

  return (
    <div
      className={`${cl.MyToast} ${cl[type]}`}
      id={String(id)}
      onClick={() => removeToast()}
    >
      <img
        className={cl.MyToastImg}
        src={img}
        onClick={() => removeToast()}
      ></img>
      <p onClick={() => removeToast()}>{message}</p>
    </div>
  );
};

export default MyToast;
