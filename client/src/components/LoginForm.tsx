import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Auth.context'
import { ToastContext } from '../context/Toast.context'
import { useHttp } from '../hooks/http.hook'
import MyButton from './UI/MyButton/MyButton'
import MyInput from './UI/MyInput/MyInput'

const LoginForm = () => {
    const auth = useContext(AuthContext)
    const {error, clearError, request} = useHttp()
    const {setToast} = useContext(ToastContext)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    if(error) {
        setToast({id: Date.now(), message: error, type: 'error'})
        clearError()
    }

    const loginHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const form = {
            email: emailValue,
            password: passwordValue,
        }

        try {
            await request('/api/auth/login', 'POST', {...form})
            .then(response => {
                setToast({id: Date.now(), message: response.message, type: 'success'})
                auth.login(response.token, response.userId)
            })
        } catch (error) {}
    }

    return (
        <form className='modal-login__form'>
            <h3 className='modal-login__form-title'>Войти</h3>
            <MyInput placeholder="E-mail" type='email' name='email' onChange={setEmailValue} value={emailValue}></MyInput>
            <MyInput placeholder="Пароль" type='password' name='password' onChange={setPasswordValue} value={passwordValue}></MyInput>
            <MyButton style={{marginTop: "20px"}} onClick={loginHandler}>Войти</MyButton>
        </form>
    )
}

export default LoginForm
