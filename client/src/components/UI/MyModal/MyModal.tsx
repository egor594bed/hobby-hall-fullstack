import React, { FC, useMemo } from "react";
import { createPortal } from "react-dom";
import cl from "./MyModal.module.scss";

interface IMyModal {
  children: React.ReactNode;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyModal: FC<IMyModal> = (props) => {
  const rootModal = useMemo(() => {
    return document.querySelector("#modal");
  }, []);

  return createPortal(
    <div className={cl.MyModal} onClick={() => props.setVisible(false)}>
      <div className={cl.MyModalWindow} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>,
    rootModal as Element
  );
};

export default MyModal;
