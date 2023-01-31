import React, { FC, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import classes from './MyModal.module.scss'

interface IMyModal {
    visible: boolean
    children: React.ReactNode
    setVisible: React.Dispatch<React.SetStateAction<boolean>>

}

const MyModal: FC<IMyModal> = (props) => {
    const nodeRef = useRef(null)
    const rootClasses = [classes.MyModal];

    const rootModal = useMemo(() => {
        return document.querySelector('#modal')
    }, [])


    if (props.visible) {
        return createPortal (
            <div className={rootClasses.join(' ')} onClick={() => props.setVisible(!props.visible)}>
                <CSSTransition in={props.visible} timeout={500} nodeRef={nodeRef} classNames={{
                    enter: classes.MyModalWindowEnter,
                    enterActive: classes.MyModalWindowEnterActive,
                    exit: classes.MyModalWindowAnimateExit,
                    exitActive: classes.MyModalWindowExitActive
                    }}>
                    <div className={classes.MyModalWindow} ref={nodeRef} onClick={(e) => e.stopPropagation()}>
                        {props.children}
                    </div>
                </CSSTransition>
            </div>,
            rootModal as Element
        )
    }
    return null
}

export default MyModal
