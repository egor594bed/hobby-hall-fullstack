import React, { useEffect, useRef } from "react";
import MyToast from "./MyToast";
import cl from "./MyToast.module.scss";
import { IToast } from "../../../types/IToast";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { autoRemoveToast } from "../../../redux/slices/toasts";
import { useDispatch } from "react-redux";

const MyToastContainer = () => {
  const dispatch = useDispatch();
  const toastList = useSelector(
    (state: RootState) => state.toastsSlice.toastList
  );
  const toastCount = useRef<number>(0);

  useEffect(() => {
    if (toastCount.current < toastList.length && toastList[0]) {
      setTimeout(() => {
        dispatch(autoRemoveToast(toastList[toastList.length - 1].id));
      }, 3000);
      toastCount.current += 1;
    } else {
      toastCount.current -= 1;
    }
  }, [toastList]);

  return (
    <div className={cl.MyToastContainer}>
      <TransitionGroup>
        {toastList.map((elem: IToast) => (
          <CSSTransition
            key={elem.id}
            timeout={500}
            classNames="toast-item-animate"
          >
            <MyToast id={elem.id} type={elem.type} message={elem.message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default MyToastContainer;
