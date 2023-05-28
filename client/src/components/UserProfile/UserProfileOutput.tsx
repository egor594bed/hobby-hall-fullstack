import React, { FC, ReactElement, useEffect, useState } from 'react'
import UserProfileOutputProfile from './UserProfileOutputProfile'
import UserProfileOutputOrders from './UserProfileOutputOrders'

interface IUserProfileOutput {
    activeMenuItem: string
}

const UserProfileOutput: FC<IUserProfileOutput> = ({activeMenuItem}) => {
    const [activeWindow, setActiveWindow] = useState<ReactElement | string>()
    const [title, setTitle] = useState<string>('Настройки профиля')

    useEffect(() => {

        switch (activeMenuItem) {
            case 'profile': 
                setActiveWindow(<UserProfileOutputProfile/>)
                setTitle('Настройки профиля')
                break;
    
            case 'orders': 
                setActiveWindow(<UserProfileOutputOrders/>)
                setTitle('Список заказов')
                break;
        
            default:
                setActiveWindow('Заглушка')
                break;
        }

    }, [activeMenuItem])


    return (
        <div className='profile__output'>
            <h2 className='profile__output-title'>{title}</h2>
            {activeWindow}
        </div>
    )
}

export default UserProfileOutput
