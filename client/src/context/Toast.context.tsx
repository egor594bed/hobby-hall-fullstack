import React, { createContext } from "react";
import { IToastContext } from "../types/IToast";


export const ToastContext = createContext<IToastContext>({
    toastList: [],
    setToast: () => {}
})