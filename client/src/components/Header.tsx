import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'
import MyModal from './UI/MyModal/MyModal'
import logo from '../img/logo.png'
import basket from '../img/basket.png'
import login from '../img/login.png'
import { CSSTransition } from 'react-transition-group'
import ContactInfo from './ContactInfo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { logout } from '../redux/slices/auth'

const Header = memo(() => {
    const isAuthenticated = useSelector((state: RootState) => state.authSlice.isAuthenticated)
    const basketCount = useSelector((state: RootState)  => state.basketSlice.basketCount)
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(isAuthenticated) setVisible(false)
    }, [isAuthenticated])

    return (
        <div className='header container'>
            <Link to="/">
                <img className='header__middle-logo' src={logo}></img>
            </Link>
            <ContactInfo/>
            <div className='header__wrapper'>
                <div className='header__top'>
                    <Link className='header__top-links' to="/rules">Правила</Link>
                    <Link className='header__top-links' to="/news">Новинки</Link>
                    <Link className='header__top-links' to="/contacts">Контакты</Link>
                </div>
                <div className='header__middle'>
                    {isAuthenticated
                        ?
                        <div className='header__middle-login' onClick={() => dispatch(logout())}>
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
                            <div className='header__middle-counter'>{basketCount}</div>
                        </div>
                        <p className='header__middle-login-text'>Корзина</p>
                    </Link>
                </div>
            </div>

            {(!isAuthenticated  && 
            <CSSTransition in={visible} classNames='modal-area' timeout={300} unmountOnExit>
                <MyModal setVisible={setVisible}>
                    <LoginModal></LoginModal>
                </MyModal>
            </CSSTransition>
            )}


        </div>
    )
})

export default Header
