import React, { useState, useContext, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'
import MyModal from './UI/MyModal/MyModal'
import logo from '../img/logo.png'
import basket from '../img/basket.png'
import login from '../img/login.png'
import { AuthContext } from '../context/Auth.context'

const Header = memo(() => {
    const auth = useContext(AuthContext)

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(auth.isAuthenticated) setVisible(false)
    }, [auth])

    return (
        <div className='header container'>
            <Link to="/">
                <img className='header__middle-logo' src={logo}></img>
            </Link>
            <div className='header__wrapper'>
                <div className='header__top'>
                    <Link className='header__top-links' to="/rules">Правила</Link>
                    <Link className='header__top-links' to="/news">Новинки</Link>
                    <Link className='header__top-links' to="/contacts">Контакты</Link>
                </div>
                <div className='header__middle'>
                    {auth.isAuthenticated
                        ?
                        <div className='header__middle-login' onClick={() => auth.logout()}>
                            <img className='header__middle-login-img' src={login} alt="login"></img>
                            <p className='header__middle-login-text'>Выйти</p>
                        </div>
                        :
                        <div className='header__middle-login' onClick={() => setVisible(!visible)}>
                            <img className='header__middle-login-img' src={login} alt="login"></img>
                            <p className='header__middle-login-text'>Войти</p>
                        </div>
                    }
                    <Link to="/basket">
                        <div className='header__middle-basket-wrapper'>
                            <img className='header__middle-basket-img' src={basket} alt="Basket"></img>
                            <div className='header__middle-counter'>0</div>
                        </div>
                        <p className='header__middle-login-text'>Корзина</p>
                    </Link>
                </div>
            </div>

            {(!auth.isAuthenticated  &&
                <MyModal visible={visible} setVisible={setVisible}>
                    <LoginModal></LoginModal>
                </MyModal>
            )}


        </div>
    )
})

export default Header
