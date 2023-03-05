import React, { useRef } from 'react'
import MyToast from './MyToast'
import cl from './MyToast.module.scss'
import { IToast } from '../../../types/IToast'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { autoRemoveToast } from '../../../redux/slices/toasts'
import { useDispatch } from 'react-redux'

const MyToastContainer = () => {
    const dispatch = useDispatch()
    const toastList = useSelector((state: RootState) => state.toastsSlice.toastList)
    const deleteTimout = useRef<NodeJS.Timeout | null>(null)

    if(toastList[0]) {
        if(deleteTimout.current) clearTimeout(deleteTimout.current)
        deleteTimout.current = setTimeout(() => {
            dispatch(autoRemoveToast())
        }, 3000)
    }

    return (
        <div className={cl.MyToastContainer}>
            <TransitionGroup>
            {
                toastList.map((elem: IToast) => (
                    <CSSTransition
                    key={elem.id}
                    timeout={500}
                    classNames="toast-item-animate"
                    >
                        <MyToast type={elem.type} message={elem.message}/>
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
        </div>
    )
}

export default MyToastContainer
