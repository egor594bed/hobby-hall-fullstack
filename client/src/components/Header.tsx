import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './Authorization/LoginModal'
import MyModal from './UI/MyModal/MyModal'
import logo from '../assets//img/logo.png'
import basket from '../assets/img/basket.png'
import login from '../assets/img/login.png'
import { CSSTransition } from 'react-transition-group'
import ContactInfo from './ContactInfo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { logout } from '../redux/slices/auth'

const Header = memo(() => {
    const isAuthorizated = useSelector((state: RootState) => state.authSlice.isAuthorizated)
    const basketCount = useSelector((state: RootState)  => state.basketSlice.basketCount)
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(isAuthorizated) setVisible(false)
    }, [isAuthorizated])

    return (
        <div className='header'>
            <div className='header__wrapper container'>
                <Link className='header__logo-link' to="/">
                    <img className='header__logo' src={logo}></img>
                </Link>
                <ContactInfo/>
                <div className='header__right'>
                    <div className='header__top'>
                        {isAuthorizated &&
                            <Link className='header__top-links' to="/profile">Профиль</Link>
                        }
                        <Link className='header__top-links' to="/rules">Правила</Link>
                        <Link className='header__top-links' to="/contacts">Контакты</Link>
                    </div>
                    <div className='header__rigth-middle'>
                        {isAuthorizated
                            ?
                            <div className='header__rigth-middle-login' onClick={() => dispatch(logout())}>
                                <img className='header__rigth-middle-login-img' src={login} alt="login"></img>
                                <p className='header__rigth-middle-login-text'>Выйти</p>
                            </div>
                            :
                            <div className='header__rigth-middle-login' onClick={() => setVisible(!visible)}>
                                <img className='header__rigth-middle-login-img' src={login} alt="login"></img>
                                <p className='header__rigth-middle-login-text'>Войти</p>
                            </div>
                        }
                        <Link to="/basket">
                            <div className='header__rigth-middle-basket-wrapper'>
                                <img className='header__rigth-middle-basket-img' src={basket} alt="Basket"></img>
                                <div className='header__rigth-middle-counter'>{basketCount}</div>
                            </div>
                            <p className='header__rigth-middle-login-text'>Корзина</p>
                        </Link>
                    </div>
                </div>
            </div>

            {(!isAuthorizated  && 
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
