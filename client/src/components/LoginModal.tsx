import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LoginModal = () => {
    const [modalStatus, setModalStatus] = useState("login")

    return (
        <>
        <div className='modal-login__radio-nav'>
            <input className='midal-login__radio' type="radio" id='login' name='loginModal' defaultChecked></input>
            <label htmlFor="login" onClick={() => setModalStatus("login")}>Войти</label>
    
            <input className='midal-login__radio' type="radio" id='registr' name='loginModal'></input>
            <label htmlFor="registr" onClick={() => setModalStatus("register")}>Регистрация</label>
        </div>
        {(modalStatus === "login")
            ?
            <LoginForm></LoginForm>
            :
            <RegisterForm></RegisterForm>
        }
        </>
    )
}

export default LoginModal
