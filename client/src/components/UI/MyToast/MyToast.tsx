import React, { FC } from 'react'
import cl from './MyToast.module.scss'

interface IMyToast {
    message: string
    type: string
}

const MyToast: FC<IMyToast> = ({message, type}) => {
    let img = ''

    if (type === 'success') img = require('../../../img/success-icon.png')
    else if (type === 'error') img = require('../../../img/error-icon.png')
    else if (type === 'info') img = require('../../../img/info-icon.png')

    return (
        <div className={`${cl.MyToast} ${cl[type]}`}>
            <img className={cl.MyToastImg} src={img}></img>
            <p>{message}</p>
        </div>
    )
}

export default MyToast
