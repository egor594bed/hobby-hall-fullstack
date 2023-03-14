import React, { FC, memo, ReactNode } from 'react'
import classes from './MyButton.module.scss'

interface IMyButton {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    children?: ReactNode
    disabled?: boolean
    style?: Object
}

const MyButton: FC<IMyButton> = memo((props) => {
    return (
        <button className={classes.MyButton}  {...props}>
            {props.children}
        </button>
    )
})

export default MyButton
