import React, { useContext } from 'react'
import { ToastContext } from '../../../context/Toast.context'
import MyToast from './MyToast'
import cl from './MyToast.module.scss'
import { IToast } from '../../../types/IToast'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const MyToastContainer = () => {
    const {toastList} = useContext(ToastContext)

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
