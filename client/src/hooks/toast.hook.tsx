import React, { useEffect, useRef, useState } from "react";
import { IToast } from "../types/IToast";

export const useToast = (() => {
    const [toastList, setToastList] = useState<IToast[]>([])
    const [toast, setToast] = useState<IToast | null>(null)
    const deleteTimout = useRef<NodeJS.Timeout | null>(null)
    

    useEffect(() => {
        
        if (toast !== null) {
            console.log(toast)
            setToastList([...toastList, toast])
            setToast(null)
        }
    }, [toast])

    useEffect(() => {
        if(toastList[0]) {
            if(deleteTimout.current) clearTimeout(deleteTimout.current)
            deleteTimout.current = setTimeout(() => {
                toastList.splice(0, 1)
                setToastList([...toastList])
            }, 3000)
        }

    }, [toastList])

    return {toastList, setToast}
})