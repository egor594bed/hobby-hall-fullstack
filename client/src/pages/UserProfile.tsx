import React, { useState } from 'react'
import UserProfileMenu from '../components/UserProfile/UserProfileMenu'
import UserProfileOutput from '../components/UserProfile/UserProfileOutput'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AuthorizationWindow from '../components/Authorization/AuthorizationWindow'

const UserProfile = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('profile')
    const isAuthorizated = useSelector((state: RootState) => state.authSlice.isAuthorizated)
    return (
        <div className='profile container'>
        {isAuthorizated
            ?
            <>
                <UserProfileMenu activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}/>
                <UserProfileOutput activeMenuItem={activeMenuItem}/>
            </>
            :
                <AuthorizationWindow title='Для просмотра профиля войдите в систему!'/>
        }
        </div>

    )
}

export default UserProfile
